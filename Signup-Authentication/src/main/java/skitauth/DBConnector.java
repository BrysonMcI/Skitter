package skitauth;
import java.sql.*;

class DBConnector {
    //STEP 1. Import required packages
    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://"+System.getenv("MYSQL_LOC")+"/skitter";

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
            System.out.printf("Connecting to database at %s\n", DB_URL);
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            //STEP 4: Execute a query
            // Let us select all the records and display them.
            String sql = "SELECT id, email FROM sessions WHERE id=?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();

            //STEP 5: Extract data from result set
            // technically this just get's the last user, but there shouldn't be multiple
            // with the same sid so hopefully it's fine
            while (rs.next()) {
                //Retrieve by column name
                String email = rs.getString("email");
                theUser = new User(email);
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

    public static boolean createSession(String id, String email, String username) {
        Connection conn = null;
        PreparedStatement stmt = null;
        PreparedStatement usr = null;
        boolean success = false;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            //STEP 4: Insert into sessions and users table if needed with a transaction
            conn.setAutoCommit(false);

            System.out.println("Creating statement...");
            String sql = "INSERT into sessions (id, email) VALUES (?, ?)";
            stmt = conn.prepareStatement(sql);

            //Bind values into the parameters.
            stmt.setString(1, id);
            stmt.setString(2, email);

            String sql2 = "INSERT IGNORE into users (email, username) VALUES (?, ?)";
            usr = conn.prepareStatement(sql2);
            usr.setString(1, email);
            usr.setString(2, username);

            int usrs = usr.executeUpdate();
            int ses = stmt.executeUpdate();
            // finally commit the changes
            conn.commit();
            System.out.println("Sessions created: " + ses + "\tUsers updated: " + usrs);
            success = ses > 0;
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                conn.setAutoCommit(true);
            } catch (SQLException e) {
                e.printStackTrace();
            }
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
