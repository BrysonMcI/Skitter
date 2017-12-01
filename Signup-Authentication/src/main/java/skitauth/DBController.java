package skitauth;

import org.springframework.web.bind.annotation.*;

@RestController
public class DBController {
    @RequestMapping(value="/isAuthenticated", method = RequestMethod.POST)
    public DB users(@RequestParam(value="sid", required = true) String sid) {
        if (sid != null) {
            return new DB(sid);
        } else {
            return new DB("");
        }
    }
}
