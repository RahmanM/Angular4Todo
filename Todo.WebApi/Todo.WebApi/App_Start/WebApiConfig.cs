using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Routing;

namespace Todos.WebApi
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Attribute routing.
      config.MapHttpAttributeRoutes();

      // Web API configuration and services
      config.MessageHandlers.Add(new AllowOptionsHandler());

      config.Routes.MapHttpRoute("DefaultApiWithId", "Api/{controller}/{id}", new { id = RouteParameter.Optional }, new { id = @"\d+" });
      config.Routes.MapHttpRoute("DefaultApiWithAction", "Api/{controller}/{action}");
      config.Routes.MapHttpRoute("DefaultApiGet", "Api/{controller}", new { action = "Get" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
      config.Routes.MapHttpRoute("DefaultApiPost", "Api/{controller}", new { action = "Post" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });


      //config.Routes.MapHttpRoute(
      //    name: "DefaultApi",
      //    routeTemplate: "api/{controller}/{id}",
      //    defaults: new { id = RouteParameter.Optional }
      //);


    }
  }

  public class AllowOptionsHandler : DelegatingHandler
  {
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
      var response = await base.SendAsync(request, cancellationToken);

      if (request.Method == HttpMethod.Options &&
          response.StatusCode == HttpStatusCode.MethodNotAllowed)
      {
        response = new HttpResponseMessage(HttpStatusCode.OK);
      }

      return response;
    }
  }
}
