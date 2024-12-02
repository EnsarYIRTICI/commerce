export const navigate = (path: string) => {
  window.location.href = path;
};

export const navigateProductPage = () => {
  navigate("/product");
};

export const navigateProductDetail = (slug: string) => {
  navigate("/product/detail/" + slug);
};

export const navigateProductCreatePage = () => {
  navigate("/product/create");
};
