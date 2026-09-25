const NSSR_EVENT_FEED = [
    { id: 'experimental', date: '2026-05-31', label: 'Physics // 2026', title: 'Frontier Experimental Physics', image: 'photos/events/exp.png' },
    { id: 'aspire', date: '2026-03-30', label: 'Research & Leadership // 2026', title: 'Pathways: Research, Leadership and Global Opportunities', image: 'photos/events/aspire.png' },
    { id: 'FWU-26', date: '2026-01-29', label: 'Research Methodology // 2026', title: 'Scientific Writing & LaTeX Workshop', image: 'photos/events/6.png' },
    { id: 'Matlab-25', date: '2025-09-06', label: 'Computation // 2025', title: 'MATLAB Workshop for Researchers', image: 'photos/Mat/Mat1.png' },
    { id: 'quantum-25', date: '2025-11-28', label: 'Physics // 2025', title: 'Crash Course on Quantum Computing', image: 'photos/events/crash.png' },
    { id: 'geo-25', date: '2025-11-28', label: 'Geo-Chemistry // 2025', title: 'Water Chemistry and Hydrogeochemical Processes', image: 'photos/chemistry1.jpeg' }
];

const getLatestNSSREvents = (count = 3) => [...NSSR_EVENT_FEED]
    .sort((first, second) => new Date(second.date) - new Date(first.date))
    .slice(0, count);
