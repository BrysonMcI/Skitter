package skitauth;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignInController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    // can specify method in @RequestMapping params, method=GET
    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    public SignIn greeting(@RequestParam(value="username") String name,
                           @RequestParam(value="password") String password) {
        return new SignIn(counter.incrementAndGet(),
                            name,
                            password);
    }
}
