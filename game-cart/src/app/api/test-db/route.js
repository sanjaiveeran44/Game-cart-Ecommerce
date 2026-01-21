import connectDB from '@/utils/DbConnection';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Connect to database
    const pool = await connectDB();
    
    // Test basic query
    const [rows] = await pool.execute('SELECT 1 as test');
    
    // Test database info
    const [info] = await pool.execute('SELECT VERSION() as version, DATABASE() as current_database');
    
    // Test table creation (if not exists)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS connection_test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Test insert
    await pool.execute(
      'INSERT INTO connection_test (message) VALUES (?)',
      ['Database connection test at ' + new Date().toISOString()]
    );
    
    // Test select
    const [testRows] = await pool.execute('SELECT * FROM connection_test ORDER BY created_at DESC LIMIT 5');
    
    // Clean up test data
    await pool.execute('DELETE FROM connection_test WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 HOUR)');
    
    return Response.json({
      success: true,
      message: 'Database connection successful!',
      database: {
        version: info[0]?.version,
        name: info[0]?.current_database,
        connected: true
      },
      test: {
        basicQuery: rows[0]?.test === 1,
        tableOperations: testRows.length > 0,
        records: testRows.length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return Response.json({
      success: false,
      message: 'Database connection failed!',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const pool = await connectDB();
    
    // Test custom query from request body
    const body = await request.json();
    const query = body.query || 'SELECT NOW() as current_time';
    
    const [rows] = await pool.execute(query);
    
    return Response.json({
      success: true,
      message: 'Query executed successfully!',
      data: rows,
      query: query,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Query execution failed!',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
