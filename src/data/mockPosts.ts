export const generateMockPosts = (leaderNames: string[]) => {
  return leaderNames.filter(Boolean).map(name => ({
    name,
    posts: Array.from({ length: 4 }, (_, i) => ({
      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      author: name,
      content: `🚀 Exciting breakthrough in ${['AI', 'Web Development', 'Cloud Computing', 'Blockchain'][i]}!

I'm thrilled to share our latest insights on ${['machine learning', 'responsive design', 'serverless architecture', 'smart contracts'][i]}. After months of research and development, we've discovered that ${['neural networks', 'CSS Grid', 'microservices', 'consensus algorithms'][i]} can revolutionize how we approach ${['data processing', 'user experience', 'scalability', 'transparency'][i]}.

Key findings:
1. 30% improvement in ${['accuracy', 'performance', 'reliability', 'security'][i]}
2. Reduced ${['training time', 'load time', 'latency', 'gas fees'][i]} by 50%
3. Enhanced ${['model interpretability', 'accessibility', 'fault tolerance', 'interoperability'][i]}

What are your thoughts on this development? Let's discuss in the comments! 💡

#${['ArtificialIntelligence', 'WebDev', 'CloudComputing', 'Blockchain'][i]} #Innovation #TechTrends`,
      likes: Math.floor(Math.random() * 1000) + 100,
      comments: Math.floor(Math.random() * 100) + 10,
      shares: Math.floor(Math.random() * 50) + 5,
      date: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
    })),
  }));
};