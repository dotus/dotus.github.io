const fs = require('fs');
const file = 'components/pr/StatsOverview.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update interface
content = content.replace(
  /    status: 'pending' \| 'opened' \| 'responded' \| 'bounced';\n    openedAt\?: string;\n    respondedAt\?: string;\n\}/g,
  "    status: 'pending' | 'opened' | 'responded' | 'bounced';\n    openedAt?: string;\n    respondedAt?: string;\n    category?: 'journalist' | 'influencer';\n}"
);

// Update mock data to include influencers
content = content.replace(
  /export const MOCK_JOURNALISTS: JournalistContact\[\] = \[\n(.*?)\];/s,
  `export const MOCK_JOURNALISTS: JournalistContact[] = [
    { id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', email: 'mike@techcrunch.com', focus: 'Startups, Europe', status: 'opened', openedAt: '2h ago', category: 'journalist' },
    { id: 2, name: 'Alex Konrad', outlet: 'Forbes', email: 'alex.konrad@forbes.com', focus: 'VC, Cloud', status: 'responded', respondedAt: '1h ago', category: 'journalist' },
    { id: 3, name: 'Casey Newton', outlet: 'Platformer', email: 'casey@platformer.news', focus: 'Social Media, Democracy', status: 'pending', category: 'journalist' },
    { id: 4, name: 'Kara Swisher', outlet: 'Pivot / NYMag', email: 'kara@nymag.com', focus: 'Tech, Business', status: 'pending', category: 'journalist' },
    { id: 5, name: 'Ryan Lawler', outlet: 'TechCrunch', email: 'ryan@techcrunch.com', focus: 'AI, Enterprise', status: 'pending', category: 'journalist' },
    { id: 6, name: 'Ingrid Lunden', outlet: 'TechCrunch', email: 'ingrid@techcrunch.com', focus: 'Funding, Europe', status: 'pending', category: 'journalist' },
    { id: 7, name: 'Natasha Mascarenhas', outlet: 'TechCrunch', email: 'natasha@techcrunch.com', focus: 'Startups, VC', status: 'pending', category: 'journalist' },
    { id: 8, name: 'Amanda Silberling', outlet: 'TechCrunch', email: 'amanda@techcrunch.com', focus: 'Creator Economy', status: 'pending', category: 'journalist' },
    { id: 9, name: 'Marques Brownlee', outlet: 'YouTube', email: 'mkbhd@gmail.com', focus: 'Tech Hardware, AI', status: 'pending', category: 'influencer' },
    { id: 10, name: 'Justine Ezarik', outlet: 'iJustine / YouTube', email: 'ijustine@gmail.com', focus: 'Consumer Tech', status: 'pending', category: 'influencer' },
    { id: 11, name: 'Linus Sebastian', outlet: 'LTT / YouTube', email: 'linus@linusmediagroup.com', focus: 'PC Hardware', status: 'pending', category: 'influencer' },
    { id: 12, name: 'MrWhoseTheBoss', outlet: 'YouTube', email: 'mrwhosetheboss@gmail.com', focus: 'Smartphones', status: 'pending', category: 'influencer' },
    { id: 13, name: 'Cleo Abram', outlet: 'YouTube / Instagram', email: 'cleo@cleoabram.com', focus: 'Tech Explainers', status: 'pending', category: 'influencer' },
    { id: 14, name: 'Taylor Hatmaker', outlet: 'TechCrunch', email: 'taylor@techcrunch.com', focus: 'AI, Policy', status: 'pending', category: 'journalist' },
    { id: 15, name: 'Aisha Malik', outlet: 'TechCrunch', email: 'aisha@techcrunch.com', focus: 'Apps, Consumer', status: 'pending', category: 'journalist' },
    { id: 16, name: 'Kyle Wiggers', outlet: 'TechCrunch', email: 'kyle@techcrunch.com', focus: 'AI, Robotics', status: 'pending', category: 'journalist' },
];`
);

fs.writeFileSync(file, content);
console.log('Patched StatsOverview.tsx');
