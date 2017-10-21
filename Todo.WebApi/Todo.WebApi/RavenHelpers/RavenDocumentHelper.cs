using Raven.Client;
using Raven.Client.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Todos.WebApi.RavenHelpers
{
  public static class RavenDocumentHelper
  {

    private static readonly Lazy<IDocumentStore> LazyStore =
        new Lazy<IDocumentStore>(() =>
        {
          var store = new DocumentStore
          {
            Url = "http://localhost:8080",
            DefaultDatabase = "Angular4Todo"
          };

          return store.Initialize();
        });

    public static IDocumentStore Store =>
        LazyStore.Value;

  }


}