import React, { useState } from 'react';
import { Download, TrendingUp, Calendar } from 'lucide-react';

const ExcelStatistik2025 = () => {
  const monate = [
    'Jan 2025', 'Feb 2025', 'Mär 2025', 'Apr 2025', 'Mai 2025', 'Jun 2025',
    'Jul 2025', 'Aug 2025', 'Sep 2025', 'Okt 2025', 'Nov 2025', 'Dez 2025'
  ];

  const [werte, setWerte] = useState(Array(12).fill(''));

  const handleWertChange = (index, value) => {
    const neueWerte = [...werte];
    neueWerte[index] = value;
    setWerte(neueWerte);
  };

  const getNumericValue = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const exportToExcel = () => {
    let csvContent = '\uFEFF';
    csvContent += 'Monat,Wert\n';
    
    monate.forEach((monat, index) => {
      const wert = werte[index] || '';
      csvContent += `${monat},${wert}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Monthly_Analytics_2025.csv';
    link.click();
  };

  const chartData = monate.map((monat, index) => ({
    monat,
    wert: getNumericValue(werte[index])
  }));

  const totalGain = chartData.reduce((sum, d) => sum + d.wert, 0);
  const avgGain = werte.filter(w => w !== '').length > 0 
    ? totalGain / werte.filter(w => w !== '').length 
    : 0;
  const positiveMonths = chartData.filter(d => d.wert > 0).length;
  const negativeMonths = chartData.filter(d => d.wert < 0).length;

  const maxWert = Math.max(...chartData.map(d => Math.abs(d.wert)), 4);
  const chartHeight = 380;
  const chartWidth = 750;
  const barWidth = 48;
  const spacing = 10;
  const leftMargin = 60;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-xl p-6 border-b border-slate-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <TrendingUp className="text-blue-400" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-white">Monthly Analytics</h1>
                <p className="text-slate-400 text-sm">Trading Performance 2025</p>
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition shadow-lg"
            >
              <Download size={18} />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-800/50">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Total Gain</div>
            <div className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGain >= 0 ? '+' : ''}{totalGain.toFixed(2)}%
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Durchschnitt</div>
            <div className={`text-2xl font-bold ${avgGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {avgGain >= 0 ? '+' : ''}{avgGain.toFixed(2)}%
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Positive Monate</div>
            <div className="text-2xl font-bold text-green-400">{positiveMonths}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Negative Monate</div>
            <div className="text-2xl font-bold text-red-400">{negativeMonths}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-800/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-slate-400" size={20} />
            <h3 className="text-lg font-semibold text-slate-300">Monthly Gain (Change)</h3>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <svg width={chartWidth} height={chartHeight} className="mx-auto">
              {/* Y-Achse */}
              <text x={leftMargin - 10} y="30" textAnchor="end" fontSize="11" fill="#94a3b8">4%</text>
              <text x={leftMargin - 10} y="115" textAnchor="end" fontSize="11" fill="#94a3b8">2%</text>
              <text x={leftMargin - 10} y="200" textAnchor="end" fontSize="11" fill="#94a3b8">0%</text>
              <text x={leftMargin - 10} y="285" textAnchor="end" fontSize="11" fill="#94a3b8">-2%</text>
              <text x={leftMargin - 10} y="360" textAnchor="end" fontSize="11" fill="#94a3b8">-4%</text>

              {/* Gitterlinien */}
              <line x1={leftMargin} y1="30" x2={chartWidth - 20} y2="30" stroke="#334155" strokeWidth="1" opacity="0.5" />
              <line x1={leftMargin} y1="115" x2={chartWidth - 20} y2="115" stroke="#334155" strokeWidth="1" opacity="0.5" />
              <line x1={leftMargin} y1="200" x2={chartWidth - 20} y2="200" stroke="#475569" strokeWidth="1.5" />
              <line x1={leftMargin} y1="285" x2={chartWidth - 20} y2="285" stroke="#334155" strokeWidth="1" opacity="0.5" />
              
              {/* Balken */}
              {chartData.map((data, index) => {
                const x = leftMargin + 15 + index * (barWidth + spacing);
                const normalizedHeight = (Math.abs(data.wert) / maxWert) * 170;
                const barHeight = data.wert === 0 ? 0 : normalizedHeight;
                const y = data.wert >= 0 ? 200 - barHeight : 200;
                
                let color = '#64748b';
                if (data.wert > 0) color = '#22c55e';
                if (data.wert < 0) color = '#ef4444';
                
                return (
                  <g key={index}>
                    {data.wert !== 0 && (
                      <>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill={color}
                          opacity="0.9"
                          rx="3"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={data.wert >= 0 ? y - 10 : y + barHeight + 18}
                          textAnchor="middle"
                          fontSize="11"
                          fill="#e2e8f0"
                          fontWeight="600"
                        >
                          {data.wert.toFixed(2)}%
                        </text>
                      </>
                    )}
                    <text
                      x={x + barWidth / 2}
                      y="345"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#94a3b8"
                    >
                      {data.monat}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Data Input */}
        <div className="bg-slate-800/50 p-6 rounded-b-xl border-t border-slate-600">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">📊 Monatsdaten eingeben</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {monate.map((monat, index) => {
              const numWert = getNumericValue(werte[index]);
              const bgColor = werte[index] === '' ? 'bg-slate-700' : numWert > 0 ? 'bg-green-900/30' : numWert < 0 ? 'bg-red-900/30' : 'bg-slate-700';
              const borderColor = werte[index] === '' ? 'border-slate-600' : numWert > 0 ? 'border-green-500/50' : numWert < 0 ? 'border-red-500/50' : 'border-slate-600';
              const textColor = werte[index] === '' ? 'text-slate-300' : numWert > 0 ? 'text-green-400' : numWert < 0 ? 'text-red-400' : 'text-slate-300';
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-20 text-sm font-medium text-slate-400">{monat}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={werte[index]}
                    onChange={(e) => handleWertChange(index, e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${bgColor} ${borderColor} ${textColor}`}
                    placeholder="0.00"
                  />
                  {werte[index] !== '' && (
                    <span className="text-lg">
                      {numWert > 0 ? '🟢' : numWert < 0 ? '🔴' : '⚪'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelStatistik2025;