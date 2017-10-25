using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Todos.WebApi.Models;
using Todos.WebApi.RavenHelpers;

namespace Todos.WebApi.Controllers
{
  public class CategoryController : ApiController
  {
    
    public IEnumerable<Category> GetCategoriesGrouped()
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {

        var todos = session.Query<Todo>().ToList();
        var cats = session.Query<Category>().ToList();

        var grouped = from c in cats
                      let counts =
                       (
                         from t in todos
                         where c.Id == t.CategoryId
                         select t
                       ).Count()
                        select new Category
                        {
                            Id = c.Id,
                            Description = c.Description,
                            Count = counts
                        };

        return grouped;
      }
    }


  }
}
