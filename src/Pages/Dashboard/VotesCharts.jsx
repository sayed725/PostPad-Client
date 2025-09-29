import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../../Components/LoadingSpinner';

const VotesCharts = ({ stats, isLoading }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Transform stats object into data array for Recharts
    const data = [
        { name: 'Votes', pv: stats.totalVotes || 0 },
        { name: 'UpVotes', pv: stats.totalUpVote || 0 },
        { name: 'DownVotes', pv: stats.totalDawnVote || 0 },
    ];

    const getIntroOfPage = (label) => {
       
        if (label === 'Votes') {
            return 'Total number of votes';
        }
        if (label === 'UpVotes') {
            return 'Total number of up votes';
        }
        if (label === 'DownVotes') {
            return 'Total number of down votes';
        }
       
        return '';
    };

    const CustomTooltip = ({ active, payload, label }) => {
        const isVisible = active && payload && payload.length;
        return (
            <div className="custom-tooltip bg-white p-4 border border-gray-300 rounded shadow-lg" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
                {isVisible && (
                    <>
                        <p className="label font-bold text-gray-800">{`${label}: ${payload[0].value}`}</p>
                        <p className="intro text-gray-600">{getIntroOfPage(label)}</p>
                        <p className="desc text-gray-500">Anything you want can be displayed here.</p>
                    </>
                )}
            </div>
        );
    };

    return (
       <div className='w-full'>
       
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
              Total Votes Overview
            </h2>
            <p className={"-mt-3 text-lg tracking-wider font-medium"}>
                A comprehensive overview of total votes at a glance.
            </p>
          
         <ResponsiveContainer width="100%" height={350} className={"mt-10"}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Bar dataKey="pv" barSize={20} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
       </div>
    );
};

export default VotesCharts;