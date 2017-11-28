package skitauth;
import java.sql.*;

class DBConnector {
    //STEP 1. Import required packages
    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/skitter";

    //  Database credentials
    static final String USER = "root";
    static final String PASS = "password";

    // may want to optimize database connections at some point
    public static User getSession(String id) {
        Connection conn = null;
        PreparedStatement stmt = null;
        User theUser = null;
        try{
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            //STEP 4: Execute a query
            // Let us select all the records and display them.
            String sql = "SELECT id, email, name FROM sessions WHERE id=?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();

            //STEP 5: Extract data from result set
            // technically this just get's the last user, but there shouldn't be multiple
            // with the same sid so hopefully it's fine
            while (rs.next()) {
                //Retrieve by column name
                String email = rs.getString("email");
                String name = rs.getString("name");

                //Display values
                System.out.print("email: " + email);
                System.out.println(", name: " + name);
                theUser = new User(name, email);
            }

            //STEP 6: Clean-up environment
            rs.close();
            stmt.close();
            conn.close();
        }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }finally{
            //finally block used to close resources
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }// nothing we can do
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
        return theUser;
    }//end main

    public static boolean createSession(String id, String email, String name) {
        Connection conn = null;
        PreparedStatement stmt = null;
        boolean success = false;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            //STEP 4: Execute a query

            System.out.println("Creating statement...");
            String sql = "INSERT into sessions (id, email, name) VALUES (?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            //Bind values into the parameters.
            stmt.setString(1, id);
            stmt.setString(2, email);
            stmt.setString(3, name);

            int rows = stmt.executeUpdate();
            System.out.println("Rows impacted : " + rows);
            success = rows > 0;
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        return success;
    }
}
