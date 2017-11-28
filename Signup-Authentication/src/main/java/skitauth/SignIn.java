package skitauth;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.security.SecureRandom;


public class SignIn {

    private final String message;

    public SignIn(String username, String password, HttpServletResponse response) {
        User user = Auth.login(username, password);
        if(user != null) {
            this.message = "Welcome: " +user.getName() +" - " + user.getEmail();
            String sid = randomString(32);
            response.addCookie(new Cookie("sid", sid));
            DBConnector.createSession(sid, user.getEmail(), user.getName());
        } else {
            this.message = "username or password incorrect";
        }
    }

    public String getContent() {
        return message;
    }

    // secure random sid generator
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    String randomString( int len ){
        StringBuilder sb = new StringBuilder( len );
        for( int i = 0; i < len; i++ )
            sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
        return sb.toString();
    }
}