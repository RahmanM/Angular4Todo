using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Todos.WebApi.RavenHelpers;
using Todos.WebApi.Models;

namespace Todos.WebApi.Controllers
{
  public class TodoController : ApiController
  {
    // GET: api/Todo
    public IEnumerable<Todo> Get()
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {
        return session.Query<Todo>().ToList();
      }
    }

    // GET: api/Todo/5
    public Todo Get(int id)
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {
        var todo = session.Load<Todo>($"todos/{id}");
        return todo;
      }
    }

    // POST: api/Todo
    public Todo Post(Todo todo)
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {
        var newTodo = new Todo() { Description = todo.Description, Completed = todo.Completed };
        session.Store(newTodo);
        todo.Id = newTodo.Id;
        session.SaveChanges();
        return todo;
      }
    }

    // PUT: api/Todo/5
    public void Put(Todo todo)
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {
        string todoId = todo.Id;
        if (!todoId.StartsWith("todos", System.StringComparison.InvariantCultureIgnoreCase))
        {
          todoId = $"todos/{todo.Id}";
        }

        var todoToUpdate = session.Load<Todo>(todoId);

        if (todoToUpdate != null)
        {
          todoToUpdate.Description = todo.Description;
          todoToUpdate.Completed = todo.Completed;
          session.SaveChanges();
        }
      }
    }

    // DELETE: api/Todo/5
    public void Delete(string id)
    {
      using (var session = RavenDocumentHelper.Store.OpenSession())
      {
        string todoId = id;
        if (!todoId.StartsWith("todos", System.StringComparison.InvariantCultureIgnoreCase))
        {
          todoId = $"todos/{id}";
        }

        var todoToDelete = session.Load<Todo>(todoId);

        if(todoToDelete != null)
        {
          session.Delete(todoToDelete);
          session.SaveChanges();
        }

      }
    }
  }
}
