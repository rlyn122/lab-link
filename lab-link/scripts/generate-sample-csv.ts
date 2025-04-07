import fs from 'fs';
import path from 'path';

/**
 * Generate sample CSV files for testing the import utility
 */
async function main() {
  console.log('Generating sample CSV files...');
  
  const outputDir = path.resolve(process.cwd(), 'sample-data');
  
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Sample faculty data
  const facultyData = [
    {
      Name: 'Dr. Jane Smith',
      Affiliation: 'Computer Science Department',
      Homepage: 'https://cs.example.edu/~jsmith',
      Email_Domain: 'cs.example.edu',
      Scholar_ID: 'jsmith123',
      Interests: 'Artificial Intelligence, Machine Learning, NLP',
      Citedby: '5000',
      Citedby5y: '3000',
      hindex: '30',
      hindex5y: '25',
      i10index: '50',
      i10index5y: '40'
    },
    {
      Name: 'Dr. John Doe',
      Affiliation: 'Computer Science Department',
      Homepage: 'https://cs.example.edu/~jdoe',
      Email_Domain: 'cs.example.edu',
      Scholar_ID: 'jdoe456',
      Interests: 'Computer Vision, Deep Learning, Robotics',
      Citedby: '7500',
      Citedby5y: '4000',
      hindex: '35',
      hindex5y: '28',
      i10index: '60',
      i10index5y: '45'
    },
    {
      Name: 'Dr. Emily Johnson',
      Affiliation: 'Electrical Engineering Department',
      Homepage: 'https://ee.example.edu/~ejohnson',
      Email_Domain: 'ee.example.edu',
      Scholar_ID: 'ejohnson789',
      Interests: 'Signal Processing, Communications, Information Theory',
      Citedby: '4200',
      Citedby5y: '2500',
      hindex: '25',
      hindex5y: '20',
      i10index: '45',
      i10index5y: '35'
    }
  ];
  
  // Sample papers data
  const papersData = [
    {
      Title: 'Advances in Neural Network Architectures',
      Year: '2023',
      URL: 'https://example.org/papers/neural-network-advances',
      Abstract: 'This paper presents new architectures for neural networks that improve performance on a variety of tasks.',
      Author: 'Dr. Jane Smith; Dr. John Doe',
      Research_Areas: 'Artificial Intelligence; Machine Learning; Deep Learning'
    },
    {
      Title: 'Explainable AI for Healthcare Applications',
      Year: '2022',
      URL: 'https://example.org/papers/explainable-ai-healthcare',
      Abstract: 'We propose methods for making AI systems used in healthcare more explainable and transparent.',
      Author: 'Dr. Jane Smith; Dr. John Doe',
      Research_Areas: 'Artificial Intelligence; Healthcare; Machine Learning'
    },
    {
      Title: 'Novel Approaches to Signal Processing in 5G Networks',
      Year: '2021',
      URL: 'https://example.org/papers/signal-processing-5g',
      Abstract: 'This paper presents innovative signal processing techniques for 5G networks.',
      Author: 'Dr. Emily Johnson',
      Research_Areas: 'Signal Processing; Communications; 5G'
    },
    {
      Title: 'Computer Vision Applications in Autonomous Vehicles',
      Year: '2022',
      URL: 'https://example.org/papers/cv-autonomous-vehicles',
      Abstract: 'We explore various computer vision algorithms for autonomous vehicle perception.',
      Author: 'Dr. John Doe; Dr. Emily Johnson',
      Research_Areas: 'Computer Vision; Autonomous Vehicles; Robotics'
    }
  ];
  
  // Write faculty data to CSV
  const facultyCsvPath = path.join(outputDir, 'faculty.csv');
  let facultyCsv = Object.keys(facultyData[0]).join(',') + '\n';
  facultyData.forEach(faculty => {
    facultyCsv += Object.values(faculty).map(value => `"${value}"`).join(',') + '\n';
  });
  fs.writeFileSync(facultyCsvPath, facultyCsv);
  
  // Write papers data to CSV
  const papersCsvPath = path.join(outputDir, 'papers.csv');
  let papersCsv = Object.keys(papersData[0]).join(',') + '\n';
  papersData.forEach(paper => {
    papersCsv += Object.values(paper).map(value => `"${value}"`).join(',') + '\n';
  });
  fs.writeFileSync(papersCsvPath, papersCsv);
  
  console.log(`✅ Sample files generated successfully:`);
  console.log(`   - ${facultyCsvPath}`);
  console.log(`   - ${papersCsvPath}`);
  console.log('');
  console.log('To import these files, you can use any of these commands:');
  console.log(`   npm run import-data faculty=${facultyCsvPath} papers=${papersCsvPath}`);
  console.log(`   npm run import-data -- faculty ${facultyCsvPath} papers ${papersCsvPath}`);
  console.log(`   npm run import-data -- --faculty=${facultyCsvPath} --papers=${papersCsvPath}`);
}

// Run the main function
main().catch(error => {
  console.error('❌ Error generating sample files:', error);
  process.exit(1);
}); 