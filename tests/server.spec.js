const request = require("supertest");
const server = require("../index"); 

describe('GET /cafes', () => {
    it('Status code 200 y un arreglo con igual o mas de un objeto', async () => {
      const response = await request(server).get('/cafes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(typeof response.body[0]).toBe('object');
    });
  });
  
  describe("DELETE /cafes Eliminar producto", () => {
    it("Si el ID no existe debe dar error 404", async () => {
      const jwt = "token"; 
      const idInvalido = 9999; 
      const response = await request(server)
        .delete(`/cafes/${idInvalido}`)
        .set("Authorization", jwt)
        .send();
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
    });
  });
  
  describe("Nuevo café", () => {
    it("POST /Cafes Debe agregar un nuevo café y devolver un código 201", async () => {
      const nuevoCafe = { id: 5, nombre: "Vainilla Latte" }; 
      const response = await request(server)
        .post("/cafes")
        .send(nuevoCafe); 
      expect(response.status).toBe(201);
      const cafes = response.body;
      const ids = cafes.map((cafe) => cafe.id);
      expect(ids).toContain(nuevoCafe.id);
      expect(cafes.find((cafe) => cafe.id === nuevoCafe.id).nombre).toBe(nuevoCafe.nombre);
    });
  });

  describe("producto actualizado", () => {
    it("Status 400 si ID parámetro no coincide con el id del payload", async () => {
      const jwt = "token";
      const idInUrl = 1;
      const producto = { id: 2, nombre: "Vainilla Latte" };
  
      const response = await request(server)
        .put(`/cafes/${idInUrl}`)
        .set("Authorization", jwt)
        .send(producto);
  
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
  });
  
  
  
