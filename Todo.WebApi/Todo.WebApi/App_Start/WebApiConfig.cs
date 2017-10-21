using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Todos.WebApi
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services
      config.MessageHandlers.Add(new AllowOptionsHandler());

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
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
