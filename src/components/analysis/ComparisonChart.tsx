import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { PostAnalysis } from '@/types/analysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  posts: PostAnalysis[];
  dateRange: string;
  metric: 'engagement' | 'performance' | 'growth';
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  posts,
  dateRange,
  metric,
}) => {
  const chartData = useMemo(() => {
    const days = Number(dateRange) || 365;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Group posts by platform
    const platformData = {
      linkedin: [] as PostAnalysis[],
      twitter: [] as PostAnalysis[],
      instagram: [] as PostAnalysis[],
    };

    posts.forEach(post => {
      const postDate = new Date(post.published_at);
      if (postDate >= cutoffDate) {
        platformData[post.platform].push(post);
      }
    });

    // Generate labels based on date range
    const labels = Array.from({ length: Math.min(12, days / 30) }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    // Calculate metrics for each platform
    const getMetricValue = (post: PostAnalysis) => {
      switch (metric) {
        case 'engagement':
          return post.metrics.engagement_rate;
        case 'performance':
          return post.performance_score;
        case 'growth':
          return post.trending_score;
      }
    };

    const datasets = Object.entries(platformData).map(([platform, platformPosts]) => {
      const color = platform === 'linkedin' ? '#0077B5' : 
                   platform === 'twitter' ? '#14171A' : 
                   '#E4405F';

      const monthlyAverages = labels.map((_, index) => {
        const monthPosts = platformPosts.filter(post => {
          const postDate = new Date(post.published_at);
          return postDate.getMonth() === (new Date().getMonth() - (labels.length - 1 - index) + 12) % 12;
        });

        if (monthPosts.length === 0) return null;
        return monthPosts.reduce((sum, post) => sum + getMetricValue(post), 0) / monthPosts.length;
      });

      return {
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        data: monthlyAverages,
        borderColor: color,
        backgroundColor: color + '20',
        tension: 0.4,
        fill: true,
      };
    });

    return { labels, datasets };
  }, [posts, dateRange, metric]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            return metric === 'engagement' ? `${value}%` : value;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {metric.charAt(0).toUpperCase() + metric.slice(1)} Comparison
      </h3>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};