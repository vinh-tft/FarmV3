const Animal = require("../Models/Animal.Model");

class AnimalService {
  static async create(data) {
    const animal = new Animal(data);
    return animal.save();
  }

  static async getAll(filter = {}) {
    return Animal.find(filter).populate('farmId');
  }

  static async getById(id) {
    return Animal.findById(id).populate('farmId');
  }

  static async update(id, data) {
    return Animal.findByIdAndUpdate(id, data, { new: true }).populate('farmId');
  }

  static async delete(id) {
    return Animal.findByIdAndDelete(id);
  }
}

module.exports = AnimalService;