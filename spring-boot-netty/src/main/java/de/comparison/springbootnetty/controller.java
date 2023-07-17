package de.comparison.springbootnetty;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/spring-boot-netty")
public class controller {

    @GetMapping("/hello-world")
    ResponseEntity<String> helloWorld()
    {
        return ResponseEntity.ok("Hello World !");
    }
    @GetMapping("/greeting/{name}")
    ResponseEntity<String> greeting(@PathVariable String name)
    {
        return ResponseEntity.ok("Hello " + name + " !");
    }
    @GetMapping("/fibonacci/{length}")
    ResponseEntity<String> fibonacci(@PathVariable int length) {
        if (length > 1) {
            long[] fibonacci = new long[length];
            fibonacci[0] = 0;
            fibonacci[1] = 1;

            for (int i = 2; i < length; i++) {
                fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
            }
            return ResponseEntity.ok(String.valueOf(fibonacci[fibonacci.length-1]));
        }
        return ResponseEntity.ok("Fibonacci calculation not possible !");
    }
}
