export async function getByPath(path: string) {
  let response = await fetch(
    `http://127.0.0.1:8000/api/pages/find/?html_path=/${path}/`
  );
  let json = await response.json();
  json.status_code = response.status;
  return json;
}

const pageTypeMapping = {
  post: ["super_page.SimplePage"],
  home: ["home.HomePage"],
};

export async function getPagesByType(type: str) {
  const typeQuery = pageTypeMapping[type].join(",");
  let response = await fetch(
    `http://127.0.0.1:8000/api/pages/?type=${typeQuery}`
  );
  let json = await response.json();
  json.status_code = response.status;
  return json;
}
