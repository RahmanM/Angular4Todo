using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Todos.WebApi.Models
{
  public class Todo
  {
    public string Id { get; set; }

    public string Description { get; set; }

    public bool Completed { get; set; }
  }
}