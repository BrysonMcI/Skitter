package skitauth;

public class DB {
    private final String email;

    public DB(String sessionID) {
        User us = DBConnector.getSession(sessionID);
        if (us != null) {
            this.email = us.getEmail();
        } else {
            email = "invalid session";
        }
    }
    public String getEmail() { return email; }
}
