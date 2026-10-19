import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMinus,
  FiPackage,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiShoppingCart,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import CheckoutDrawer from "../componentes/CheckoutDrawer/CheckoutDrawer";
import { catalogoProdutos } from "../data/produtos";
import { listarProdutos } from "../services/produtosApi";
import { calcularFrete, criarPedido } from "../services/checkoutApi";
import { theme } from "../styles/theme";

const CART_KEY = "amaisindicadaCart";
const ORDERS_KEY = "amaisindicadaOrders";
const paymentMethods = [
  { id: "pix", titleKey: "pixTitle", descriptionKey: "pixDescription" },
  { id: "cartao", titleKey: "cardTitle", descriptionKey: "cardDescription" },
  { id: "boleto", titleKey: "boletoTitle", descriptionKey: "boletoDescription" },
];

const emptyCheckout = {
  nome: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
};

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 78px 0;

  @media (max-width: 560px) {
    padding: 52px 0 140px;
  }
`;

const Hero = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 28px;
  align-items: end;
  margin-bottom: 22px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.teal};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 14px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.8rem);
  line-height: 0.95;

  @media (max-width: 560px) {
    font-size: clamp(2.45rem, 12vw, 3.25rem);
  }
`;

const Lead = styled.p`
  max-width: 720px;
  margin: 18px 0 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.8;
`;

const AssurancePanel = styled.aside`
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const AssuranceItem = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: start;

  svg {
    width: 18px;
    height: 18px;
    color: ${theme.colors.tealDark};
    margin-top: 2px;
  }

  strong {
    display: block;
    line-height: 1.2;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${theme.colors.brownSoft};
    font-size: 0.88rem;
    line-height: 1.45;
  }
`;

const TrustBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 26px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 58px;
  padding: 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.brown};
  font-weight: 800;

  svg {
    color: ${theme.colors.tealDark};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: 2rem;
    line-height: 1;
  }

  p {
    max-width: 420px;
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.5;
  }

  @media (max-width: 720px) {
    display: grid;
  }
`;

const StoreLayout = styled.div`
  display: block;
`;

const ProductArea = styled.section``;

const SetupState = styled.div`
  display: grid;
  gap: 14px;
  padding: clamp(22px, 4vw, 34px);
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);

  h3 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    line-height: 1;
  }

  p {
    max-width: 680px;
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.7;
  }
`;

const SetupList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const SetupItem = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  background: ${theme.colors.cream};
  color: ${theme.colors.brownSoft};
  line-height: 1.45;

  svg {
    color: ${theme.colors.tealDark};
    margin-top: 2px;
  }

  strong {
    display: block;
    color: ${theme.colors.brown};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: grid;
  grid-template-rows: 230px auto;
  overflow: hidden;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 52px rgba(48, 38, 29, 0.12);
  }
`;

const ImageWrap = styled.div`
  display: grid;
  place-items: center;
  padding: 18px;
  background: linear-gradient(180deg, ${theme.colors.white}, ${theme.colors.cream});
`;

const ProductImage = styled.img`
  max-width: 84%;
  max-height: 210px;
  object-fit: contain;
`;

const CardBody = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
`;

const SmallCaps = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ProductName = styled.h2`
  min-height: 58px;
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: 1.45rem;
  line-height: 1.05;
`;

const ProductText = styled.p`
  min-height: 48px;
  margin: 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.55;
`;

const Price = styled.strong`
  color: ${theme.colors.brown};
  font-size: 1.1rem;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ $variant }) => ($variant === "ghost" ? theme.colors.line : theme.colors.teal)};
  border-radius: 999px;
  color: ${({ $variant }) => ($variant === "ghost" ? theme.colors.brown : theme.colors.white)};
  background: ${({ $variant }) => ($variant === "ghost" ? theme.colors.white : theme.colors.teal)};
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const CheckoutSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: 12px 18px;
  border-bottom: 1px solid ${theme.colors.line};
  background: ${theme.colors.cream};
`;

const Step = styled.div`
  display: grid;
  gap: 4px;
  color: ${({ $active }) => ($active ? theme.colors.brown : theme.colors.brownSoft)};
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;

  span {
    display: block;
    height: 4px;
    border-radius: 999px;
    background: ${({ $active }) => ($active ? theme.colors.tealDark : theme.colors.line)};
  }
`;

const CartItem = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: ${theme.colors.cream};
`;

const FormSectionTitle = styled.h3`
  margin: 6px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: 1.25rem;
  line-height: 1;
`;

const CartItemTop = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: start;

  strong {
    line-height: 1.25;
  }
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${theme.colors.line};
  border-radius: 999px;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  cursor: pointer;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  color: ${theme.colors.brown};
  font-size: 0.86rem;
  font-weight: 800;
`;

const FullField = styled(Field)`
  grid-column: 1 / -1;
`;

const Input = styled.input`
  min-height: 42px;
  width: 100%;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  outline-color: ${theme.colors.teal};
`;

const ShippingOption = styled.label`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};
  cursor: pointer;
`;

const PaymentGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const PaymentOption = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
  padding: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.tealDark : theme.colors.line)};
  border-radius: 8px;
  background: ${({ $selected }) => ($selected ? theme.colors.white : theme.colors.cream)};
  box-shadow: ${({ $selected }) => ($selected ? "0 0 0 2px rgba(22, 119, 132, 0.12)" : "none")};
  cursor: pointer;

  strong {
    display: block;
    line-height: 1.25;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${theme.colors.brownSoft};
    font-size: 0.84rem;
    line-height: 1.4;
  }
`;

const ReviewBox = styled.div`
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h3 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: 1.15rem;
    line-height: 1;
  }
`;

const ReviewLine = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
  color: ${theme.colors.brownSoft};
  font-size: 0.9rem;
  line-height: 1.45;

  strong {
    color: ${theme.colors.brown};
    white-space: nowrap;
  }
`;

const FinalTotal = styled(ReviewLine)`
  padding-top: 10px;
  border-top: 1px solid ${theme.colors.line};
  color: ${theme.colors.brown};
  font-size: 1rem;
  font-weight: 800;
`;

const Notice = styled.div`
  padding: 12px;
  border-radius: 8px;
  color: ${({ $error }) => ($error ? "#8a2e1f" : theme.colors.brownSoft)};
  background: ${theme.colors.cream};
  font-weight: ${({ $error }) => ($error ? 800 : 500)};
  line-height: 1.5;
`;

const EmptyState = styled.div`
  padding: 30px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.brownSoft};
`;

const EmptyCart = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};
  color: ${theme.colors.brownSoft};
  line-height: 1.55;
`;

const SecureNote = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  align-items: start;
  padding: 12px;
  border-radius: 8px;
  background: ${theme.colors.cream};
  color: ${theme.colors.brownSoft};
  font-size: 0.88rem;
  line-height: 1.45;

  svg {
    color: ${theme.colors.tealDark};
    margin-top: 2px;
  }
`;

const formatPrice = (value) => {
  const price = Number(value);
  if (!Number.isFinite(price) || price <= 0) {
    return "Preco sob consulta";
  }

  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const hasPrice = (produto) => Number(produto.preco) > 0;
const onlyDigits = (value) => String(value || "").replace(/\D/g, "");

const getCartFromStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const saveOrderAccess = (pedido) => {
  try {
    const current = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    const next = [
      { id: pedido.id, accessToken: pedido.accessToken, criadoEm: pedido.criadoEm },
      ...current.filter((item) => item.id !== pedido.id),
    ].slice(0, 20);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  } catch (error) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([{ id: pedido.id, accessToken: pedido.accessToken, criadoEm: pedido.criadoEm }]));
  }
};

function Loja() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState(catalogoProdutos);
  const [cart, setCart] = useState(getCartFromStorage);
  const [checkout, setCheckout] = useState(emptyCheckout);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingStatus, setShippingStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderError, setOrderError] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cepStatus, setCepStatus] = useState("");

  useEffect(() => {
    listarProdutos().then(setProdutos);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!cart.length) {
      setCheckoutOpen(false);
    }
  }, [cart.length]);

  useEffect(() => {
    const cep = onlyDigits(checkout.cep);

    if (cep.length !== 8) {
      setCepStatus("");
      return undefined;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setCepStatus(t("loja.cep.lookup"));

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal });
        const data = await response.json();

        if (data.erro) {
          setCepStatus(t("loja.cep.notFound"));
          return;
        }

        setCheckout((current) => ({
          ...current,
          logradouro: current.logradouro || data.logradouro || "",
          bairro: current.bairro || data.bairro || "",
          cidade: current.cidade || data.localidade || "",
          uf: current.uf || data.uf || "",
        }));
        setCepStatus(t("loja.cep.filled"));
      } catch (error) {
        if (error.name !== "AbortError") {
          setCepStatus(t("loja.cep.error"));
        }
      }
    }, 450);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [checkout.cep, t]);

  const lojaProdutos = useMemo(
    () => produtos.filter((produto) => produto.ativo !== false && produto.exibirLoja !== false),
    [produtos]
  );

  const pricedProducts = useMemo(() => lojaProdutos.filter(hasPrice).length, [lojaProdutos]);
  const purchasableProducts = useMemo(() => lojaProdutos.filter(hasPrice), [lojaProdutos]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const produto = produtos.find((current) => current.id === item.id);
          return produto ? { ...produto, quantidade: item.quantidade } : null;
        })
        .filter(Boolean),
    [cart, produtos]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.preco || 0) * item.quantidade, 0);
  const shippingTotal = selectedShipping ? Number(selectedShipping.valor || 0) : 0;
  const total = subtotal + shippingTotal;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantidade, 0);
  const checkoutProgress = selectedShipping ? "pagamento" : checkout.cep ? "frete" : "entrega";
  const addressSummary = [checkout.logradouro, checkout.numero, checkout.bairro, checkout.cidade, checkout.uf]
    .filter(Boolean)
    .join(", ");

  const cartPayload = cartItems.map((item) => ({ id: item.id, quantidade: item.quantidade }));

  const updateCheckout = (field, value) => {
    setCheckout((current) => ({ ...current, [field]: value }));
    if (field === "cep") {
      setShippingOptions([]);
      setSelectedShipping(null);
      setShippingStatus("");
    }
  };

  const addToCart = (produto) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === produto.id);
      if (existing) {
        return current.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }

      return [...current, { id: produto.id, quantidade: 1 }];
    });
    setCheckoutOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + delta } : item))
        .filter((item) => item.quantidade > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const handleCalculateShipping = async () => {
    setShippingStatus(t("loja.shipping.loading"));
    setOrderError("");

    try {
      const result = await calcularFrete({ cepDestino: checkout.cep, items: cartPayload });
      setShippingOptions(result.options || []);
      setSelectedShipping(result.options?.[0] || null);
      setShippingStatus(result.options?.length ? "" : t("loja.shipping.empty"));
    } catch (error) {
      setShippingOptions([]);
      setSelectedShipping(null);
      setShippingStatus(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOrderStatus("");
    setOrderError("");

    try {
      const pedido = await criarPedido({
        items: cartPayload,
        frete: selectedShipping,
        cliente: {
          nome: checkout.nome,
          email: checkout.email,
          telefone: checkout.telefone,
        },
        endereco: {
          cep: checkout.cep,
          logradouro: checkout.logradouro,
          numero: checkout.numero,
          complemento: checkout.complemento,
          bairro: checkout.bairro,
          cidade: checkout.cidade,
          uf: checkout.uf,
        },
        pagamento: {
          metodo: paymentMethod,
        },
      });

      setCart([]);
      setShippingOptions([]);
      setSelectedShipping(null);
      setCheckout(emptyCheckout);
      setOrderStatus(t("loja.order.success", { id: pedido.id }));
      saveOrderAccess(pedido);
      navigate(`/pedido/${pedido.id}?token=${pedido.accessToken}`);
    } catch (error) {
      setOrderError(error.message);
    }
  };

  return (
    <Page>
      <Seo titleKey="loja.seo.title" descriptionKey="loja.seo.description" />
      <Header />
      <Main>
        <Hero>
          <div>
            <Eyebrow>
              <FiShoppingBag /> {t("loja.hero.eyebrow")}
            </Eyebrow>
            <Title>{t("loja.hero.title")}</Title>
            <Lead>{t("loja.hero.lead")}</Lead>
          </div>
          <AssurancePanel aria-label={t("loja.assurance.aria")}>
            <AssuranceItem>
              <FiShield />
              <div>
                <strong>{t("loja.assurance.protected.title")}</strong>
                <span>{t("loja.assurance.protected.text")}</span>
              </div>
            </AssuranceItem>
            <AssuranceItem>
              <FiTruck />
              <div>
                <strong>{t("loja.assurance.shipping.title")}</strong>
                <span>{t("loja.assurance.shipping.text")}</span>
              </div>
            </AssuranceItem>
            <AssuranceItem>
              <FiLock />
              <div>
                <strong>{t("loja.assurance.privacy.title")}</strong>
                <span>{t("loja.assurance.privacy.text")}</span>
              </div>
            </AssuranceItem>
          </AssurancePanel>
        </Hero>

        <TrustBar>
          <TrustItem><FiCreditCard /> {t("loja.trust.payment")}</TrustItem>
          <TrustItem><FiTruck /> {t("loja.trust.delivery")}</TrustItem>
          <TrustItem><FiPackage /> {t("loja.trust.tracking")}</TrustItem>
          <TrustItem><FiCheckCircle /> {t("loja.trust.return")}</TrustItem>
        </TrustBar>

        <StoreLayout>
          <ProductArea>
            <SectionHeader>
              <div>
                <SmallCaps>{t("loja.section.eyebrow")}</SmallCaps>
                <h2>{t("loja.section.title")}</h2>
              </div>
              <p>
                {pricedProducts
                  ? t("loja.section.available", { count: pricedProducts })
                  : t("loja.section.setup")}
              </p>
            </SectionHeader>

            {pricedProducts ? (
              <Grid>
                {purchasableProducts.map((produto) => {
                  return (
                    <Card key={produto.id}>
                      <ImageWrap>
                        <ProductImage src={produto.imagem} alt={produto.nome} />
                      </ImageWrap>
                      <CardBody>
                        <SmallCaps>{produto.linha}</SmallCaps>
                        <ProductName>{produto.nome}</ProductName>
                        <ProductText>{produto.perfil}</ProductText>
                        <Price>{formatPrice(produto.preco)}</Price>
                        {produto.estoque ? <SmallCaps>{produto.estoque}</SmallCaps> : null}
                        <Button type="button" onClick={() => addToCart(produto)}>
                          <FiShoppingCart /> {t("loja.addToCart")}
                        </Button>
                      </CardBody>
                    </Card>
                  );
                })}
              </Grid>
            ) : lojaProdutos.length ? (
              <SetupState>
                <SmallCaps>{t("loja.setup.eyebrow")}</SmallCaps>
                <h3>{t("loja.setup.title")}</h3>
                <p>{t("loja.setup.text")}</p>
                <SetupList>
                  <SetupItem>
                    <FiCreditCard />
                    <span><strong>{t("loja.setup.price.title")}</strong>{t("loja.setup.price.text")}</span>
                  </SetupItem>
                  <SetupItem>
                    <FiPackage />
                    <span><strong>{t("loja.setup.package.title")}</strong>{t("loja.setup.package.text")}</span>
                  </SetupItem>
                  <SetupItem>
                    <FiCheckCircle />
                    <span><strong>{t("loja.setup.enable.title")}</strong>{t("loja.setup.enable.text")}</span>
                  </SetupItem>
                </SetupList>
              </SetupState>
            ) : (
              <EmptyState>{t("loja.empty")}</EmptyState>
            )}
          </ProductArea>

          <CheckoutDrawer
            open={checkoutOpen}
            floatingVisible={totalQuantity > 0 && !checkoutOpen}
            floatingLabel={t("loja.cart.floating", { count: totalQuantity, total: formatPrice(subtotal) })}
            floatingIcon={<FiShoppingCart />}
            title={t("loja.checkoutPanel.title")}
            closeLabel={t("loja.checkoutPanel.close")}
            onOpen={() => setCheckoutOpen(true)}
            onClose={() => setCheckoutOpen(false)}
            onSubmit={handleSubmit}
          >
            <CheckoutSteps>
              <Step $active><span /> {t("loja.steps.cart")}</Step>
              <Step $active={checkoutProgress === "entrega" || checkoutProgress === "frete" || checkoutProgress === "pagamento"}><span /> {t("loja.steps.delivery")}</Step>
              <Step $active={checkoutProgress === "frete" || checkoutProgress === "pagamento"}><span /> {t("loja.steps.shipping")}</Step>
              <Step $active={checkoutProgress === "pagamento"}><span /> {t("loja.steps.order")}</Step>
            </CheckoutSteps>
            <>
              {cartItems.length ? (
                <>
                  {cartItems.map((item) => (
                    <CartItem key={item.id}>
                      <CartItemTop>
                        <strong>{item.nome}</strong>
                        <IconButton type="button" onClick={() => removeFromCart(item.id)} aria-label={t("loja.cart.remove")}>
                          <FiTrash2 />
                        </IconButton>
                      </CartItemTop>
                      <SmallCaps>{formatPrice(item.preco)}</SmallCaps>
                      <QtyRow>
                        <IconButton type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={t("loja.cart.decrease")}>
                          <FiMinus />
                        </IconButton>
                        <strong>{item.quantidade}</strong>
                        <IconButton type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={t("loja.cart.increase")}>
                          <FiPlus />
                        </IconButton>
                      </QtyRow>
                    </CartItem>
                  ))}

                  <FormSectionTitle>{t("loja.sections.contact")}</FormSectionTitle>
                  <FieldGrid>
                    <FullField>
                      {t("loja.checkoutFields.nome")}
                      <Input autoComplete="name" required value={checkout.nome} onChange={(event) => updateCheckout("nome", event.target.value)} />
                    </FullField>
                    <Field>
                      {t("loja.checkoutFields.email")}
                      <Input autoComplete="email" required type="email" value={checkout.email} onChange={(event) => updateCheckout("email", event.target.value)} />
                    </Field>
                    <Field>
                      {t("loja.checkoutFields.telefone")}
                      <Input autoComplete="tel" required value={checkout.telefone} onChange={(event) => updateCheckout("telefone", event.target.value)} />
                    </Field>
                  </FieldGrid>

                  <FormSectionTitle>{t("loja.sections.address")}</FormSectionTitle>
                  <FieldGrid>
                    <Field>
                      {t("loja.checkoutFields.cep")}
                      <Input autoComplete="postal-code" inputMode="numeric" required value={checkout.cep} onChange={(event) => updateCheckout("cep", event.target.value)} />
                    </Field>
                    <Field>
                      {t("loja.checkoutFields.uf")}
                      <Input autoComplete="address-level1" required maxLength={2} value={checkout.uf} onChange={(event) => updateCheckout("uf", event.target.value)} />
                    </Field>
                    <FullField>
                      {t("loja.checkoutFields.logradouro")}
                      <Input autoComplete="street-address" required value={checkout.logradouro} onChange={(event) => updateCheckout("logradouro", event.target.value)} />
                    </FullField>
                    <Field>
                      {t("loja.checkoutFields.numero")}
                      <Input required value={checkout.numero} onChange={(event) => updateCheckout("numero", event.target.value)} />
                    </Field>
                    <Field>
                      {t("loja.checkoutFields.complemento")}
                      <Input value={checkout.complemento} onChange={(event) => updateCheckout("complemento", event.target.value)} />
                    </Field>
                    <Field>
                      {t("loja.checkoutFields.bairro")}
                      <Input value={checkout.bairro} onChange={(event) => updateCheckout("bairro", event.target.value)} />
                    </Field>
                    <Field>
                      {t("loja.checkoutFields.cidade")}
                      <Input autoComplete="address-level2" required value={checkout.cidade} onChange={(event) => updateCheckout("cidade", event.target.value)} />
                    </Field>
                  </FieldGrid>
                  {cepStatus ? <Notice>{cepStatus}</Notice> : null}

                  <SecureNote>
                    <FiShield />
                    <span>{t("loja.secureNote")}</span>
                  </SecureNote>

                  <Button type="button" $variant="ghost" onClick={handleCalculateShipping} disabled={!checkout.cep || !cartItems.length}>
                    <FiTruck /> {t("loja.shipping.calculate")}
                  </Button>

                  {shippingStatus ? <Notice $error={!shippingStatus.includes(t("loja.shipping.loading"))}>{shippingStatus}</Notice> : null}

                  {shippingOptions.map((option) => (
                    <ShippingOption key={option.id}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping?.id === option.id}
                        onChange={() => setSelectedShipping(option)}
                      />
                      <span>
                        <strong>{option.nome}</strong>
                        <br />
                        <SmallCaps>{option.prazoDias ? t("loja.shipping.deadline", { days: option.prazoDias }) : t("loja.shipping.noDeadline")}</SmallCaps>
                      </span>
                      <strong>{formatPrice(option.valor)}</strong>
                    </ShippingOption>
                  ))}

                  <FormSectionTitle>{t("loja.sections.payment")}</FormSectionTitle>
                  <PaymentGrid>
                    {paymentMethods.map((method) => (
                      <PaymentOption key={method.id} $selected={paymentMethod === method.id}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                        />
                        <span>
                          <strong>{t(`loja.payment.${method.titleKey}`)}</strong>
                          {t(`loja.payment.${method.descriptionKey}`)}
                        </span>
                      </PaymentOption>
                    ))}
                  </PaymentGrid>

                  <ReviewBox>
                    <ReviewHeader>
                      <h3>{t("loja.review.title")}</h3>
                      <SmallCaps>{t("loja.review.items", { count: totalQuantity })}</SmallCaps>
                    </ReviewHeader>
                    {cartItems.map((item) => (
                      <ReviewLine key={`review-${item.id}`}>
                        <span>{item.quantidade}x {item.nome}</span>
                        <strong>{formatPrice(Number(item.preco || 0) * item.quantidade)}</strong>
                      </ReviewLine>
                    ))}
                    <ReviewLine>
                      <span>{t("loja.subtotalLabel")}</span>
                      <strong>{formatPrice(subtotal)}</strong>
                    </ReviewLine>
                    <ReviewLine>
                      <span>{selectedShipping?.nome || t("loja.shipping.label")}</span>
                      <strong>{selectedShipping ? formatPrice(selectedShipping.valor) : t("loja.totalOnRequest")}</strong>
                    </ReviewLine>
                    <ReviewLine>
                      <span>{t("loja.review.delivery")}</span>
                      <strong>{addressSummary || t("loja.review.addressMissing")}</strong>
                    </ReviewLine>
                    <ReviewLine>
                      <span>{t("loja.review.payment")}</span>
                      <strong>{t(`loja.payment.${paymentMethods.find((method) => method.id === paymentMethod)?.titleKey}`)}</strong>
                    </ReviewLine>
                    <FinalTotal>
                      <span>{t("loja.totalLabel")}</span>
                      <strong>{selectedShipping ? formatPrice(total) : t("loja.totalOnRequest")}</strong>
                    </FinalTotal>
                  </ReviewBox>

                  {orderError ? <Notice $error>{orderError}</Notice> : null}
                  {orderStatus ? <Notice>{orderStatus}</Notice> : null}

                  <Button type="submit" disabled={!selectedShipping}>
                    <FiLock /> {t("loja.checkout")}
                  </Button>
                </>
              ) : (
                <>
                  <EmptyCart>
                    <strong>{t("loja.cart.empty")}</strong>
                    <span>{t("loja.cart.emptyHint")}</span>
                  </EmptyCart>
                  <SecureNote>
                    <FiLock />
                    <span>{t("loja.cart.secureEmpty")}</span>
                  </SecureNote>
                </>
              )}
            </>
          </CheckoutDrawer>
        </StoreLayout>
      </Main>
      <Footer />
    </Page>
  );
}

export default Loja;
