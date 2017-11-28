package skitauth;

import org.springframework.web.bind.annotation.*;

@RestController
public class DBController {
    @RequestMapping(value="/isAuthenticated", method = RequestMethod.GET)
    public DB users(@CookieValue(value="sid", required = false) String sid) {
        if (sid != null) {
            return new DB(sid);
        } else {
            return new DB("");
        }
    }
}
