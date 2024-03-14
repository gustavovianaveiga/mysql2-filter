export default function filter(conn, query, filter) {
  if (!conn || !query || !filter) throw Error("Missing parameters");
  function removerValoresNulos(objeto) {
    for (let chave in objeto) {
      if (!objeto[chave]) {
        delete objeto[chave];
      }
    }
    return objeto;
  }

  filter = removerValoresNulos(filter);
  let filters = "";
  const haveWhere = query.includes("WHERE");
  let primeiraExecucao = true;

  for (let chave in filter) {
    if (filter.hasOwnProperty(chave)) {
      const valor = filter[chave];

      if (primeiraExecucao && !haveWhere) {
        filters += ` WHERE ${chave} = '${valor}' `;
      } else {
        filters += ` AND ${chave} = '${valor}' `;
      }
      primeiraExecucao = false;
    }
  }
  return new Promise((resolve, reject) => {
    conn.query(query + filters, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(query + filters);
      resolve(data);
    });
  });
}
