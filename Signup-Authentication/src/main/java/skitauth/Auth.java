package skitauth;
/*
 * @(#)Simple.java	1.3 99/09/21
 * 
 * Copyright 1997, 1998, 1999 Sun Microsystems, Inc. All Rights
 * Reserved.
 * 
 * Sun grants you ("Licensee") a non-exclusive, royalty free,
 * license to use, modify and redistribute this software in source and
 * binary code form, provided that i) this copyright notice and license
 * appear on all copies of the software; and ii) Licensee does not 
 * utilize the software in a manner which is disparaging to Sun.
 *
 * This software is provided "AS IS," without a warranty of any
 * kind. ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND
 * WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, ARE 
 * HEREBY EXCLUDED.  SUN AND ITS LICENSORS SHALL NOT BE LIABLE 
 * FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, 
 * MODIFYING OR DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES. IN 
 * NO EVENT WILL SUN OR ITS LICENSORS BE LIABLE FOR ANY LOST 
 * REVENUE, PROFIT OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL,
 * CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER 
 * CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT 
 * OF THE USE OF OR INABILITY TO USE SOFTWARE, EVEN IF SUN HAS 
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 * 
 * This software is not designed or intended for use in on-line
 * control of aircraft, air traffic, aircraft navigation or aircraft
 * communications; or in the design, construction, operation or
 * maintenance of any nuclear facility. Licensee represents and warrants
 * that it will not use or redistribute the Software for such purposes.  
 */

import javax.naming.*;
import javax.naming.directory.*;

import java.util.Hashtable;

/**
 * Demonstrates how to create an initial context to an LDAP server
 * using simple authentication.
 *
 * usage: java Simple
 */
class Auth {
    public static User login(String username, String password) {

        // Set up environment for creating initial context
        Hashtable env = new Hashtable(11);
        env.put(Context.INITIAL_CONTEXT_FACTORY,
            "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, "ldaps://ldap.rit.edu:636");
        // Authenticate as <username> and password <password>
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, "uid="+username+",ou=people,dc=rit,dc=edu");
        env.put(Context.SECURITY_CREDENTIALS, password);

        try {
            // Create initial context
            DirContext ctx = new InitialDirContext(env);

            // System.out.println("connected...");

            String[] attrIDs = {"displayname", "mail"};
            Attributes ansr = ctx.getAttributes("uid="+username+", ou=people,dc=rit,dc=edu", attrIDs);
            // janky ldap string parsing
            String email = ansr.get("mail").toString().split("[ ]")[1];
            String name = ansr.get("displayname").toString();
            // System.out.println(email);
            if(name.length() > 2) {
                name = name.split("[ ]")[1]+ " " + name.split("[ ]")[2];
            }
            // System.out.println(name);

            // Close the context when we're done
            ctx.close();
            // System.out.println("...connection closed");
            return new User(name, email);
        } catch (NamingException e) {
            System.out.println("an error occurred: "+e.getMessage());
            return null;
            //e.printStackTrace();
        }
	}
}