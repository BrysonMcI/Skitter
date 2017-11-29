package skitauth;

public class User {
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;

    @Override
    public String toString() {
        return "User{" +
                  ", email='" + email + '\'' +
                '}';
    }

    public User(String email) {
       this.email = email;
    }
}
