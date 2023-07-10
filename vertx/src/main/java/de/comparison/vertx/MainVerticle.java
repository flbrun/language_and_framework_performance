package de.comparison.vertx;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

import java.util.HashSet;
import java.util.Set;

public class MainVerticle extends AbstractVerticle {

  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    Router router = Router.router(vertx);
    Set<String> allowHeaders = new HashSet<>();
    allowHeaders.add("x-requested-with");
    allowHeaders.add("Access-Control-Allow-Origin");
    allowHeaders.add("origin");
    allowHeaders.add("Content-Type");
    allowHeaders.add("accept");
    Set<HttpMethod> allowMethods = new HashSet<>();
    allowMethods.add(HttpMethod.GET);
    allowMethods.add(HttpMethod.POST);
    allowMethods.add(HttpMethod.DELETE);
    allowMethods.add(HttpMethod.PUT);

    router.route().handler(CorsHandler.create()
      .addOrigin("*")
      .allowedHeaders(allowHeaders)
      .allowedMethods(allowMethods)
      .allowCredentials(true));
    router.route().handler(BodyHandler.create());

    router.get("/vertx/hello-world").handler(this::helloWorld);
    router.get("/vertx/greeting/:name").handler(this::greeting);
    router.get("/vertx/fibonacci/:length").handler(this::fibonacci);



    vertx.createHttpServer()
      .requestHandler(router)
      .listen(8888)
      .onSuccess(server ->
      {
        startPromise.complete();
        System.out.println("Server started successfully on port " + server.actualPort());
      })
      .onFailure(error -> startPromise.fail(error.getCause()));
  }

  private void helloWorld(RoutingContext context)
  {
    context.response().end("Hello World !");
  }


  private void greeting(RoutingContext context)
  {
    String name = context.request().getParam("name");

    context.response().end("Hello " + name + " !");
  }


  private void fibonacci(RoutingContext context)
  {
    int length = Integer.parseInt(context.request().getParam("length"));

    if(length>1) {
      long[] fibonacci = new long[length];
      fibonacci[0] = 0;
      fibonacci[1] = 1;

      for (int i = 2; i < length; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
      }
      context.response().end(String.valueOf(fibonacci[fibonacci.length-1]));
    }
    else context.response().end("Fibonacci calculation not possible !");
  }
}

