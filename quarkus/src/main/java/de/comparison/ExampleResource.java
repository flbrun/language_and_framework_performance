package de.comparison;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.http.HttpRequest;

@Path("/quarkus")
public class ExampleResource {

    @GET()
    @Path("/hello-world")
    @Produces(MediaType.TEXT_PLAIN)
    public Response hello() {
        return Response.ok("Hello World !").build();
    }

    @GET()
    @Path("/greeting/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response greeting(@PathParam("name") String name) {
        return Response.ok("Hello " + name + " !").build();
    }

    @GET()
    @Path("/fibonacci/{length}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response fibonacci(@PathParam("length") int length) {
        if (length > 1) {
            long[] fibonacci = new long[length];
            fibonacci[0] = 0;
            fibonacci[1] = 1;

            for (int i = 2; i < length; i++) {
                fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
            }
            return Response.ok(String.valueOf(fibonacci[fibonacci.length-1])).build();
        }
        else
        {
            return Response.ok("Fibonacci calculation not possible !").build();
        }
    }

}
