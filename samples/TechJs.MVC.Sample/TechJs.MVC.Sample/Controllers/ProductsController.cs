using Microsoft.AspNetCore.Mvc;
using TechJs.MVC.Sample.Models;

namespace TechJs.MVC.Sample.Controllers;


public class ProductsController : Controller
{
    private readonly ProductRepository _repository;

    public ProductsController(ProductRepository repository)
    {
        _repository = repository;
    }
    public IActionResult Index()
    {
        var products = _repository.GetAll();

        return View(products);
    }
    [HttpGet]
    public IActionResult Create()
    {
        return PartialView("_ProductForm", new Product());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Product product)
    {
        if (!ModelState.IsValid)
        {
            return Json(new { Result = false, Message = "خطا داری!" });
        }

        _repository.Add(product);

        return Json(new { Result = true, Message = "Product Add Succeful!" }); 
    }
    [HttpGet]
    public IActionResult Edit(int id)
    {
        var temp = _repository.GetById(id);
        return PartialView("_ProductForm", temp);
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(Product product)
    {
        if (!ModelState.IsValid)
        {
            return Json(new
            {
                result = false,
                message = "Please complete all required fields."
            });
        }

        var result = _repository.Update(product);

        return Json(new
        {
            result,
            message = result
                ? "Product edited successfully!"
                : "Product not found!"
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public JsonResult Delete(int id)
    {
        var result = _repository.Delete(id);

        return Json(new
        {
            result,
            message = result
                ? "Product deleted successfully!"
                : "Product not found!"
        });
    }

    [HttpGet]
    public IActionResult List()
    {
        var products = _repository.GetAll();

        return PartialView("_ProductList", products);
    }
}

