export const navigate = (path: string) => {
  window.location.href = path;
};

export const navigateAdminProductPage = () => {
  navigate("/admin/product");
};

export const navigateAdminProductDetail = (slug: string) => {
  navigate("/admin/product/detail/" + slug);
};

export const navigateAdminProductCreatePage = () => {
  navigate("/admin/product/create");
};
