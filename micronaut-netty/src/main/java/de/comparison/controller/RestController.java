package de.comparison.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Produces;

@Controller("/micronaut-netty")
public class RestController {

    @Get("/hello-world")
    @Produces(MediaType.TEXT_PLAIN)
    public HttpResponse<String> helloWorld(){
        return HttpResponse
                .status(HttpStatus.OK)
                .body("Hello World !");

    }

    @Get("/greeting/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public HttpResponse<String> greeting(@PathVariable String name){
        return HttpResponse
                .status(HttpStatus.OK)
                .body("Hello " + name + " !");

    }

    @Get("/fibonacci/{length}")
    @Produces(MediaType.TEXT_PLAIN)
    public HttpResponse<String> fibonacci(@PathVariable int length){
        if (length > 1) {
            long[] fibonacci = new long[length];
            fibonacci[0] = 0;
            fibonacci[1] = 1;

            for (int i = 2; i < length; i++) {
                fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
            }
            return HttpResponse
                    .status(HttpStatus.OK)
                    .body(String.valueOf(fibonacci[fibonacci.length-1]));
        }
        return HttpResponse
                .status(HttpStatus.OK)
                .body("Fibonacci calculation not possible !");
    }

}

