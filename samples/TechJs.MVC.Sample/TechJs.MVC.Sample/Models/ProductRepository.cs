

namespace TechJs.MVC.Sample.Models;

public class ProductRepository
{
    private readonly List<Product> _products =
    [
        new()
        {
            Id = 1,
            Name = "Laptop",
            Price = 1200,
            Description = "Business laptop"
        },
        new()
        {
            Id = 2,
            Name = "Keyboard",
            Price = 80,
            Description = "Mechanical keyboard"
        },
        new()
        {
            Id = 3,
            Name = "Mouse",
            Price = 45,
            Description = "Wireless mouse"
        }
    ];

    private int _nextId = 4;

    public IReadOnlyList<Product> GetAll()
    {
        return _products;
    }

    public Product? GetById(int id)
    {
        return _products.FirstOrDefault(x => x.Id == id);
    }

    public Product Add(Product product)
    {
        product.Id = _nextId++;

        _products.Add(product);

        return product;
    }

    public bool Update(Product product)
    {
        var existing = GetById(product.Id);

        if (existing is null)
            return false;

        existing.Name = product.Name;
        existing.Price = product.Price;
        existing.Description = product.Description;

        return true;
    }

    public bool Delete(int id)
    {
        var product = GetById(id);

        if (product is null)
            return false;

        _products.Remove(product);

        return true;
    }
}