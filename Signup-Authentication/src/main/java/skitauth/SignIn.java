package skitauth;

public class SignIn {

    private final String message;

    public SignIn(long id, String username, String password) {
        User user = Auth.login(username, password);
        if(user != null) {
            this.message = "Welcome: " +user.getName() +" - " + user.getEmail();
        } else {
            this.message = "username or password incorrect";
        }
    }

    public String getContent() {
        return message;
    }
}