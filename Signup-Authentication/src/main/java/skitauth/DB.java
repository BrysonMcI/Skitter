package skitauth;

public class DB {
    private final String email;
    private final String name;

    public DB(String sessionID) {
        User us = DBConnector.getSession(sessionID);
        if (us != null) {
            this.email = us.getEmail();
            this.name = us.getName();
        } else {
            email = name = "not signed in";
        }
    }
    public String getEmail() { return email; }
    public String getName() { return name; }
}
