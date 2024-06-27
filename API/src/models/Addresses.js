import Query from "./Query.js";

class Addresses {
  static async getAllAddresses() {
    const query = `
    SELECT addresses.id,
    addresses.address_type,
    addresses.street,
    addresses.complement,
    addresses.city,
    addresses.zip_code,
    addresses.country,
    addresses.users_id,
    users.firstname,
    users.lastname
    FROM addresses
    JOIN users ON addresses.users_id = users.id
    ORDER BY users.lastname ASC
    `;
    const response = await Query.run(query);
    return response;
  }

  static async getAddressesById(id) {
    const query = `
    SELECT addresses.id,
    addresses.address_type,
    addresses.street,
    addresses.complement,
    addresses.city,
    addresses.zip_code,
    addresses.country,
    addresses.users_id,
    users.firstname,
    users.lastname
    FROM addresses
    JOIN users ON addresses.users_id = users.id
    WHERE addresses.id = ?
    `;
    const data = {id};
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddAddresses(data) {
    const query = `
    INSERT INTO addresses (address_type, street, complement, city, zip_code, country, users_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditAddresses(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE addresses SET address_type = ?, street = ?, complement = ?, city = ?, zip_code = ?, country = ?, users_id = ?
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteAddressesById(id){
    const data = id;
    const query = `DELETE FROM addresses WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Addresses;
