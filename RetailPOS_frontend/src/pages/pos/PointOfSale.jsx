import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Barcode,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  UserRound,
  CreditCard,
  Banknote,
  ReceiptText,
} from "lucide-react";

const products = [
  {
    id: 1,
    code: "PRD001",
    name: "Formal Shirt Blue",
    price: 999,
    tax: 18,
    stock: 20,
  },
  {
    id: 2,
    code: "PRD002",
    name: "Premium Jacket",
    price: 3499,
    tax: 18,
    stock: 5,
  },
  {
    id: 3,
    code: "PRD003",
    name: "Slim Fit Trousers",
    price: 1799,
    tax: 12,
    stock: 14,
  },
  {
    id: 4,
    code: "PRD004",
    name: "Cotton T-Shirt",
    price: 799,
    tax: 5,
    stock: 35,
  },
  {
    id: 5,
    code: "PRD005",
    name: "Leather Wallet",
    price: 1299,
    tax: 18,
    stock: 8,
  },
];

export default function PointOfSale() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) =>
      [
        product.code,
        product.name,
      ].some((field) =>
        String(field)
          .toLowerCase()
          .includes(value)
      )
    );
  }, [query]);

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + amount,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const removeItem = (id) => {
    setCart((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const tax = cart.reduce(
    (sum, item) =>
      sum +
      (item.price *
        item.quantity *
        item.tax) /
        100,
    0
  );

  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    alert(
      `Sale completed successfully.\nAmount: ₹${total.toFixed(
        2
      )}\nPayment: ${paymentMethod}`
    );

    setCart([]);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Point of Sale
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            Create sales, manage cart items and process payments.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 py-3">
          <ReceiptText
            size={17}
            className="text-primary"
          />

          <span className="text-sm">
            Items:
          </span>

          <strong>
            {cart.length}
          </strong>
        </div>
      </div>

      <div className="grid min-h-[650px] grid-cols-1 gap-5 xl:grid-cols-[1fr_430px]">
        {/* PRODUCTS */}

        <div className="space-y-5">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Scan barcode or search product..."
                className="input input-bordered w-full pl-10"
              />

              <Barcode
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(
              (product, index) => (
                <motion.button
                  key={product.id}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    addToCart(product)
                  }
                  className="rounded-2xl border border-base-300 bg-base-100 p-5 text-left shadow-sm transition hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <ShoppingCart
                      size={20}
                      className="text-primary"
                    />
                  </div>

                  <div className="font-mono text-xs text-base-content/50">
                    {product.code}
                  </div>

                  <h3 className="mt-1 font-semibold">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-lg font-bold">
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </div>

                      <div className="text-xs text-base-content/50">
                        GST {product.tax}%
                      </div>
                    </div>

                    <span className="badge badge-success badge-outline">
                      {product.stock} stock
                    </span>
                  </div>
                </motion.button>
              )
            )}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-base-300 p-12 text-center">
              No products found.
            </div>
          )}
        </div>

        {/* CART */}

        <div className="flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="border-b border-base-300 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <ShoppingCart
                  size={19}
                  className="text-primary"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Current Sale
                </h2>

                <p className="text-xs text-base-content/50">
                  {cart.length} product
                  {cart.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <ShoppingCart
                  size={40}
                  className="text-base-content/20"
                />

                <p className="mt-4 font-medium">
                  Cart is empty
                </p>

                <p className="mt-1 text-sm text-base-content/50">
                  Add products to begin the sale.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-base-300 p-3"
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="text-xs text-base-content/50">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}{" "}
                          each
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="btn btn-ghost btn-xs btn-square text-error"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-base-300">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              -1
                            )
                          }
                          className="btn btn-ghost btn-xs"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              1
                            )
                          }
                          className="btn btn-ghost btn-xs"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <strong>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-base-300 p-5">
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium">
                Customer
              </label>

              <div className="relative">
                <UserRound
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                />

                <input
                  value={customer}
                  onChange={(event) =>
                    setCustomer(
                      event.target.value
                    )
                  }
                  placeholder="Walk-in customer"
                  className="input input-bordered w-full pl-9"
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                ["Subtotal", subtotal],
                ["Tax", tax],
                ["Total", total],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-base-200 p-3"
                  >
                    <p className="text-[11px] text-base-content/50">
                      {label}
                    </p>

                    <p className="mt-1 font-semibold">
                      ₹
                      {value.toFixed(2)}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium">
                Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setPaymentMethod(
                      "Cash"
                    )
                  }
                  className={`btn ${
                    paymentMethod ===
                    "Cash"
                      ? "btn-primary"
                      : "btn-outline"
                  } gap-2`}
                >
                  <Banknote size={16} />
                  Cash
                </button>

                <button
                  onClick={() =>
                    setPaymentMethod(
                      "Card"
                    )
                  }
                  className={`btn ${
                    paymentMethod ===
                    "Card"
                      ? "btn-primary"
                      : "btn-outline"
                  } gap-2`}
                >
                  <CreditCard size={16} />
                  Card
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full"
              disabled={cart.length === 0}
            >
              Complete Sale ₹
              {total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}