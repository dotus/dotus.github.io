import React, { useState } from 'react';
import { Search, Plus, Filter, User } from 'lucide-react';

const MOCK_DB = [
    { id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', focus: 'Startups, Europe', sentiment: 'Neutral' },
    { id: 2, name: 'Kara Swisher', outlet: 'Pivot / NYMag', focus: 'Tech, Business', sentiment: 'Tough' },
    { id: 3, name: 'Alex Konrad', outlet: 'Forbes', focus: 'VC, Cloud', sentiment: 'Positive' },
    { id: 4, name: 'Ryan Lawler', outlet: 'TechCrunch', focus: 'Mobility, Crypto', sentiment: 'Neutral' },
    { id: 5, name: 'Casey Newton', outlet: 'Platformer', focus: 'Social Media, Democracy', sentiment: 'Analytical' },
];

export const MediaDatabase: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = searchTerm === '' ? MOCK_DB : MOCK_DB.filter(j =>
        j.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.outlet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.focus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="font-serif text-4xl mb-2">Journalist Search</h1>
                    <p className="text-black/60">Access over 10,000 verified journalist contacts.</p>
                </div>
                <button className="bg-white border border-black/10 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50">
                    <Filter size={16} /> Filters
                </button>
            </header>

            <div className="relative mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={20} />
                <input
                    type="text"
                    placeholder="Search by name, outlet, or topic..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-black/30 transition-shadow shadow-sm text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-sm flex-1 min-h-[700px]">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-black/5 text-xs uppercase tracking-wider text-black/40 font-medium">
                        <tr>
                            <th className="p-4">Journalist</th>
                            <th className="p-4">Outlet</th>
                            <th className="p-4">Focus Areas</th>
                            <th className="p-4">Past Sentiment</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filtered.map(j => (
                            <tr key={j.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black/40 font-medium text-xs">{j.name.charAt(0)}</div>
                                        <span className="font-medium text-black text-lg font-serif">{j.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-black/70 font-medium">{j.outlet}</td>
                                <td className="p-4"><span className="bg-black/5 px-2.5 py-1 rounded-md text-xs text-black/60 font-medium max-w-[150px] inline-block whitespace-normal">{j.focus}</span></td>
                                <td className="p-4 text-sm font-medium text-black/60">{j.sentiment}</td>
                                <td className="p-4 text-right">
                                    <button className="text-black/40 hover:text-black p-2 rounded hover:bg-black/5 inline-flex items-center gap-2 transition-all">
                                        <Plus size={16} /> <span className="text-sm font-medium">Add to List</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-20 text-black/40">No journalists found matching "{searchTerm}"</div>
                )}
            </div>
        </div>
    );
};
