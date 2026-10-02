# Basic Role Permission Flow - Infrastructure Seeder

## Overview
This document explains how the `ApplicationDbSeeder` creates roles and assigns permissions in the ABC School multi-tenant application.

---

## Core Components

### 1. SchoolPermission Record
```csharp
public record SchoolPermission(
    string Action, 
    string Feature, 
    string Description, 
    string Group = "", 
    bool IsBasic = false, 
    bool IsRoot = false
)
{
    public string Name => NameFor(Action, Feature);  // "Permission.{Feature}.{Action}"
    
    public static string NameFor(string action, string feature) 
        => $"Permission.{feature}.{action}";
}
```

**Example:**
```csharp
new SchoolPermission(
    SchoolAction.Read,           // "Read"
    SchoolFeature.Schools,       // "Schools"
    "Read Schools",              // Description
    "Academics",                 // Group
    IsBasic: true,               // ← Key flag
    IsRoot: false
)
// Name = "Permission.Schools.Read"
```

---

### 2. SchoolPermissions Static Lists
```csharp
private static readonly SchoolPermission[] _allPermissions = [ /* 19 permissions */ ];

public static IReadOnlyList<SchoolPermission> All { get; }        // All 19
public static IReadOnlyList<SchoolPermission> Root { get; }       // IsRoot=true (4)
public static IReadOnlyList<SchoolPermission> Admin { get; }      // !IsRoot (15)
public static IReadOnlyList<SchoolPermission> Basic { get; }      // IsBasic=true (1)
```

**Basic Permission List:**
```csharp
SchoolPermissions.Basic = [
    SchoolPermission {
        Action: "Read",
        Feature: "Schools",
        Name: "Permission.Schools.Read",
        Description: "Read Schools",
        Group: "Academics",
        IsBasic: true,
        IsRoot: false
    }
]
```

---

## Seeder Flow: InitializeDatabaseAsync

### Step 1: Loop Through Default Roles
```csharp
foreach (var roleName in RoleConstants.DefaultRoles)  // ["Basic", "Admin"]
{
    // Get or create role → stored in incomingRole
    if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName) 
        is not ApplicationRole incomingRole)
    {
        incomingRole = new ApplicationRole { Name = roleName, ... };
        await _roleManager.CreateAsync(incomingRole);
    }
    
    // Assign permissions based on role name
    if (roleName == RoleConstants.Basic)
        await AssignPermissionsToRole(SchoolPermissions.Basic, incomingRole, ct);
    else if (roleName == RoleConstants.Admin)
        await AssignPermissionsToRole(SchoolPermissions.Admin, incomingRole, ct);
}
```

### Step 2: Pattern Matching Explained
```csharp
// "If result is NOT an ApplicationRole, assign to incomingRole and run block"
if (await _roleManager.Roles.SingleOrDefaultAsync(...) is not ApplicationRole incomingRole)
{
    // Runs ONLY when role is NULL (missing)
    incomingRole = new ApplicationRole { ... };
    await _roleManager.CreateAsync(incomingRole);
}
// After block: incomingRole = existing role OR newly created role
```

| DB Result | Enters `if` Block? | `incomingRole` Value |
|-----------|-------------------|---------------------|
| Role exists | ❌ No | Existing `ApplicationRole` from DB |
| Role missing | ✅ Yes | New `ApplicationRole` (created in block) |

---

## AssignPermissionsToRole Method

### Signature
```csharp
private async Task AssignPermissionsToRole(
    IReadOnlyList<SchoolPermission> incomingRolePermissions,  // Permission definitions
    ApplicationRole currentrole,                              // Role entity (with Id)
    CancellationToken ct)
```

### For Basic Role - Concrete Values

| Parameter | Value |
|-----------|-------|
| `currentrole` | `ApplicationRole { Id: "guid-123", Name: "Basic", ... }` |
| `incomingRolePermissions` | `List<SchoolPermission>` with 1 item: `Permission.Schools.Read` |

### Method Logic
```csharp
var currentAssignedClaims = await _roleManager.GetClaimsAsync(currentrole);

foreach (var permission in incomingRolePermissions)  // 1 iteration for Basic
{
    bool hasPermission = currentAssignedClaims.Any(c => 
        c.Type == ClaimConstants.Permission && c.Value == permission.Name);
    
    if (!hasPermission)  // Only add if MISSING
    {
        await _applicationDbContext.RoleClaims.AddAsync(new ApplicationRoleClaim
        {
            RoleId = currentrole.Id,                    // "guid-123"
            ClaimType = ClaimConstants.Permission,      // "Permission"
            ClaimValue = permission.Name,               // "Permission.Schools.Read"
            Description = permission.Description,       // "Read Schools"
            Group = permission.Group                    // "Academics"
        }, ct);
    }
}
await _applicationDbContext.SaveChangesAsync();
```

---

## Database Result: RoleClaims Table

After seeding Basic role:

| RoleId | ClaimType | ClaimValue | Description | Group |
|--------|-----------|------------|-------------|-------|
| guid-123 | Permission | Permission.Schools.Read | Read Schools | Academics |

---

## Visual Summary

```
RoleConstants.DefaultRoles
       │
       ▼
┌────────────────────────┐
│ roleName = "Basic"     │
└────────────────────────┘
       │
       ▼
Get/Create ApplicationRole
       │
       ├── Exists → incomingRole = existing
       └── Missing → incomingRole = new (saved)
       │
       ▼
SchoolPermissions.Basic ──► [Permission.Schools.Read]
       │
       ▼
AssignPermissionsToRole(currentrole, incomingRolePermissions)
       │
       ├── currentrole.Id = "guid-123"
       ├── permission.Name = "Permission.Schools.Read"
       ├── Checks existing claims
       └── Adds RoleClaim if missing
       │
       ▼
RoleClaims table updated
```

---

## Key Takeaways

1. **`incomingRole`** = bridge variable holding the `ApplicationRole` entity (existing or new)
2. **`SchoolPermissions.Basic`** = filtered list (only `IsBasic=true` permissions)
3. **`AssignPermissionsToRole`** = joins role.Id + permission.Name → RoleClaim row
4. **Pattern matching** (`is not`) = compact null-check + variable assignment
5. **Permissions are data-driven** — flags (`IsBasic`, `IsRoot`) control assignment, not hardcoded lists