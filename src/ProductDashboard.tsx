"use client";

import { useState, useMemo } from 'react';

// ==========================================
// 1. DEFINICIÓN DE TIPOS
// ==========================================
interface Product {
  id: string;
  nombre: string;
  linkSenasa: string | null;
  vencimientoSenasa: string | null;
  linkFichaTecnica: string | null;
  linkHojaSeguridad: string | null;
}

// ==========================================
// 2. ICONOS SVG AUTOCONTENIDOS (Cero dependencias)
// ==========================================
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
);

const FileOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="m2 2 20 20"></path>
    <path d="M15 2H6a2 2 0 0 0-2 2v12"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10.4 14.8a2.93 2.93 0 1 1 4.2-4.2"></path>
    <path d="M8 18h12a2 2 0 0 0 2-2V8l-6-6"></path>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
  </svg>
);

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400">
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m21 2-9.6 9.6"></path>
    <path d="m15.5 7.5 3 3"></path>
    <path d="M17.5 5.5 20 8"></path>
  </svg>
);

// ==========================================
// 3. BASE DE DATOS INICIAL (Conexiones reales)
// ==========================================
const initialProducts: Product[] = [
  {
    id: "141846",
    nombre: "Desengrasante PANTER H",
    linkSenasa: "/docs/Panter_h/SENASA_Panter_H.pdf",
    vencimientoSenasa: "2027-07-19",
    linkFichaTecnica: "/docs/Panter_h/FT_Panter_H.pdf",
    linkHojaSeguridad: "/docs/Panter_h/FDS_Panter_H.pdf"
  },
  {
    id: "141843",
    nombre: "Desengrasante PANTER I",
    linkSenasa: "/docs/Panter_i/Certificado_C-31-PANTER_I_03.2025_1.pdf",
    vencimientoSenasa: "2030-03-12",
    linkFichaTecnica: "/docs/Panter_i/FT_Panter_I.pdf",
    linkHojaSeguridad: "/docs/Panter_i/FDS_Panter_I.pdf"
  },
  {
    id: "141840",
    nombre: "Desinfectante SANITOL Azul",
    linkSenasa: "/docs/Sanitol_azul/Certificado_RNPUD_n_250092-Sanitol_Azul_02.2024.pdf",
    vencimientoSenasa: "2028-03-28",
    linkFichaTecnica: "/docs/Sanitol_azul/FT_Sanitol_azul.pdf",
    linkHojaSeguridad: "/docs/Sanitol_azul/FDS_SANITOL_AZUL.pdf"
  },
  {
    id: "141841",
    nombre: "Desinfectante SANITOL Incoloro",
    linkSenasa: "/docs/Sanitol_incoloro/Certificado_RNPUD_n_250092-Sanitol_Incoloro_02.2024.pdf",
    vencimientoSenasa: "2028-04-18",
    linkFichaTecnica: "/docs/Sanitol_incoloro/FT_Sanitol_incoloro.pdf",
    linkHojaSeguridad: "/docs/Sanitol_incoloro/FDS_SANITOL_INCOLORO.pdf"
  },
  {
    id: "151602",
    nombre: "Jabon Liquido en Espuma MultiFlex x 1 lt Elite 8056",
    linkSenasa: "https://drive.google.com/file/d/1wuKIsQnpqjg195yWZNrAYxOvQhCRVNJr/view?usp=drive_link",
    vencimientoSenasa: "2026-11-10",
    linkFichaTecnica: "https://drive.google.com/file/d/1Xyup6u_7H6nkeWYAt52OGs8hMo7Xz22B/view?usp=drive_link",
    linkHojaSeguridad: "https://drive.google.com/file/d/1QQWhKCBrE0n5G0lOK_73u62DeVWoc7a8/view?usp=drive_link"
  },
  {
    id: "141844",
    nombre: "Limpiador Alpo 22",
    linkSenasa: "https://drive.google.com/file/d/1Zp1fvj0rt-T9-Zz6udLFy2RHwg0XMrnQ/view?usp=drive_link",
    vencimientoSenasa: "2027-08-30",
    linkFichaTecnica: "https://drive.google.com/file/d/1VBV9BS5Tk_kI2_rKr2dg_qkmiwl7BRQ-/view?usp=drive_link",
    linkHojaSeguridad: "https://drive.google.com/file/d/1R5qySTW8nPzMeywZxI2ZxLVoKj4RMySK/view?usp=drive_link"
  },
  {
    id: "151600",
    nombre: "Toalla Bco Excellence Lamin Non Touch Elite 6297",
    linkSenasa: null,
    vencimientoSenasa: null,
    linkFichaTecnica: "https://drive.google.com/file/d/1g4jsMx18QTnl00vWwx2-ZJf34KfFASXp/view?usp=drive_link",
    linkHojaSeguridad: null
  },
  {
    id: "121578",
    nombre: "Toalla Intercalada Excelence Elite Blanca",
    linkSenasa: null,
    vencimientoSenasa: null,
    linkFichaTecnica: "https://drive.google.com/file/d/149YXVga3bG6JliEFhm01SXr9D2K1-rkb/view?usp=drive_link",
    linkHojaSeguridad: null
  },
  {
    id: "151605",
    nombre: "Alcohol en Spray MultiFlex x 1 litro Elite 8061",
    linkSenasa: "https://drive.google.com/file/d/1dF6M_56Sh5sjsJnyTbTeADbJ2DH_gNuE/view?usp=drive_link",
    vencimientoSenasa: "2029-12-13",
    linkFichaTecnica: "https://drive.google.com/file/d/1_xVA1FZ9wIdg_8BhjqfUF0otTPjmPKhs/view?usp=drive_link",
    linkHojaSeguridad: "https://drive.google.com/file/d/1RnI2j1KrmJ-46ovWPRxsMe3k_XeriCav/view?usp=drive_link"
  },
  {
    id: "120915",
    nombre: "Lavavajilla manual concentrado SUTTER Deter1",
    linkSenasa: "https://drive.google.com/file/d/1Z9Cthcs9lByXZQtXD6LqFblg4QEq7UUY/view?usp=drive_link",
    vencimientoSenasa: "2030-08-10",
    linkFichaTecnica: "https://drive.google.com/file/d/1Mqwwjz8dbdPUcW-EQTpICeaXEHanJ1sN/view?usp=drive_link",
    linkHojaSeguridad: "https://drive.google.com/file/d/1nD7fyQ6zwkeRvhlD1En-F1MrkH8nVy_7/view?usp=drive_link"
  }
];

// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================
export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Estados para el Modal de Contraseña de Administrador
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Estados para el CRUD de productos (Crear / Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estados del Formulario del Modal
  const [formId, setFormId] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [formVencimiento, setFormVencimiento] = useState("");
  const [formLinkSenasa, setFormLinkSenasa] = useState("");
  const [formLinkFT, setFormLinkFT] = useState("");
  const [formLinkHDS, setFormLinkHDS] = useState("");

  // Resolutor de enlaces relativos a absolutos para que funcionen los PDFs en el nuevo subdominio
  const getAbsoluteLink = (link: string | null): string => {
    if (!link) return "";
    if (link.startsWith('/docs/')) {
      return `https://quimicos-granix-mvp.vercel.app${link}`;
    }
    return link;
  };

  // Lógica de cálculo de estado para los productos
  const getProductStatus = (product: Product): "Completo" | "Incompleto" | "Vencido" | "Por Vencer" => {
    const hasAllDocs = product.linkSenasa && product.linkFichaTecnica && product.linkHojaSeguridad;
    if (!hasAllDocs) {
      return "Incompleto";
    }

    if (product.vencimientoSenasa) {
      const vencimiento = new Date(product.vencimientoSenasa);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (vencimiento < today) {
        return "Vencido";
      }

      // Alerta de vencimiento cercano: dentro de los próximos 90 días
      const diffTime = vencimiento.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 90) {
        return "Por Vencer";
      }
    }

    return "Completo";
  };

  // Filtrado y búsqueda reactiva
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const status = getProductStatus(product);
      const matchesFilter = statusFilter === "Todos" || status === statusFilter;
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.nombre.toLowerCase().includes(searchLower) || 
        product.id.includes(searchLower);

      return matchesFilter && matchesSearch;
    });
  }, [products, searchTerm, statusFilter]);

  // Estilos visuales de los badges de estado
  const getStatusBadgeStyles = (status: "Completo" | "Incompleto" | "Vencido" | "Por Vencer") => {
    switch (status) {
      case "Completo":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Incompleto":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Por Vencer":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "Vencido":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    }
  };

  // ==========================================
  // MANEJADORES CRUD (CREAR, EDITAR, ELIMINAR)
  // ==========================================

  // Manejador del botón Modo Admin (Con protección de contraseña "1001" en Modal)
  const handleToggleAdminMode = () => {
    if (!isAdminMode) {
      setAdminPasswordInput("");
      setPasswordError(null);
      setIsPasswordModalOpen(true);
    } else {
      setIsAdminMode(false);
    }
  };

  // Verificación de la Contraseña ingresada en el Modal
  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === "1001") {
      setIsAdminMode(true);
      setIsPasswordModalOpen(false);
      setAdminPasswordInput("");
      setPasswordError(null);
    } else {
      setPasswordError("Contraseña incorrecta. Acceso denegado.");
    }
  };

  // Abrir formulario para Crear
  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingId(null);
    setFormId((Math.floor(100000 + Math.random() * 900000)).toString()); // Genera un código aleatorio
    setFormNombre("");
    setFormVencimiento("");
    setFormLinkSenasa("");
    setFormLinkFT("");
    setFormLinkHDS("");
    setIsModalOpen(true);
  };

  // Abrir formulario para Editar
  const handleOpenEdit = (product: Product) => {
    setModalMode('edit');
    setEditingId(product.id);
    setFormId(product.id);
    setFormNombre(product.nombre);
    setFormVencimiento(product.vencimientoSenasa || "");
    setFormLinkSenasa(product.linkSenasa || "");
    setFormLinkFT(product.linkFichaTecnica || "");
    setFormLinkHDS(product.linkHojaSeguridad || "");
    setIsModalOpen(true);
  };

  // Eliminar un producto
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`¿Está seguro de que desea eliminar el producto "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Guardar Formulario (Crear o Actualizar)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formId.trim() || !formNombre.trim()) {
      alert("Por favor, complete el código ID y el nombre del producto.");
      return;
    }

    const cleanLink = (link: string) => link.trim() === "" ? null : link.trim();

    const productData: Product = {
      id: formId.trim(),
      nombre: formNombre.trim(),
      linkSenasa: cleanLink(formLinkSenasa),
      vencimientoSenasa: formVencimiento.trim() === "" ? null : formVencimiento.trim(),
      linkFichaTecnica: cleanLink(formLinkFT),
      linkHojaSeguridad: cleanLink(formLinkHDS)
    };

    if (modalMode === 'create') {
      if (products.some(p => p.id === productData.id)) {
        alert("El código de producto (ID) ya se encuentra registrado. Utilice uno diferente.");
        return;
      }
      setProducts(prev => [productData, ...prev]);
    } else {
      setProducts(prev => prev.map(p => p.id === editingId ? productData : p));
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#0c1222] font-sans">
      {/* Estilos inline para ocultar barra de desplazamiento en chips de categorías */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* ==========================================
          HEADER / NAVEGACIÓN PRINCIPAL
          ========================================== */}
      <nav className="sticky top-0 z-40 border-b border-[#1e293b] bg-[#0c1222]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo e Indicador de Sistema Activo */}
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-3">
                <img src="/granix-logo-center.png" alt="Granix" className="h-9 w-auto object-contain" />
              </a>
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="hidden md:inline">Sistema Activo</span>
              </span>
            </div>

            {/* Enlaces Principales - Desktop (Visibles en md y superiores) */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="relative px-1 py-2 text-sm font-semibold text-white group">
                Productos Químicos
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-t transform scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>

            {/* Botón de Menú Hamburguesa - Móvil (Visible únicamente en móviles) */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none min-w-[44px] min-h-[44px]"
                aria-label="Abrir menú de navegación"
              >
                <MenuIcon />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ==========================================
          DRAWER / MENÚ LATERAL MÓVIL
          ========================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0c1222] border-l border-[#1e293b] p-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
                <img src="/granix-logo-center.png" alt="Granix" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 min-w-[44px] min-h-[44px]"
                  aria-label="Cerrar menú"
                >
                  <XIcon />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                <a 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-semibold text-white bg-slate-800/50 rounded-xl"
                >
                  Productos Químicos
                </a>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#1e293b] text-center">
              <p className="text-xs text-slate-500">© 2026 Granix S.A.</p>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          CONTENIDO PRINCIPAL
          ========================================== */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Cabecera de Sección */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Panel de Control</h2>
            <p className="text-sm mt-1 text-slate-400">Supervisión de documentación y cumplimiento regulatorio</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Botón Agregar Producto - Únicamente visible cuando Modo Admin está Activo */}
            {isAdminMode && (
              <button 
                onClick={handleOpenCreate}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 transition-all min-h-[44px] shadow-lg shadow-emerald-600/10 cursor-pointer"
              >
                <PlusIcon />
                <span>Agregar Producto</span>
              </button>
            )}

            {/* Botón Admin */}
            <button 
              onClick={handleToggleAdminMode}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg border transition-all min-h-[44px] cursor-pointer ${
                isAdminMode 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10' 
                  : 'text-slate-300 bg-[#1e293b] border-[#334155] hover:bg-[#253347] hover:border-slate-500'
              }`}
            >
              <LockIcon />
              {isAdminMode ? "Modo Admin: Activo" : "Modo Admin"}
            </button>
          </div>
        </div>

        {/* ==========================================
            BARRA DE BÚSQUEDA Y FILTROS
            ========================================== */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre de producto o código..." 
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#334155] bg-[#1e293b] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all min-h-[44px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2 scrollbar-none md:overflow-visible md:whitespace-normal md:pb-0">
            {["Todos", "Completo", "Por Vencer", "Incompleto", "Vencido"].map((statusOption) => {
              const isActive = statusFilter === statusOption;
              const count = products.filter(p => statusOption === "Todos" || getProductStatus(p) === statusOption).length;

              return (
                <button
                  key={statusOption}
                  onClick={() => setStatusFilter(statusOption)}
                  className={`inline-flex items-center px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer min-h-[40px] ${
                    isActive 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/10' 
                      : 'bg-[#1e293b] text-slate-300 border-[#334155] hover:bg-[#253347] hover:border-slate-500'
                  }`}
                >
                  {statusOption === "Todos" ? "Todos los estados" : statusOption}
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Mensaje de no resultados */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-[#1e293b]/30 rounded-xl border border-[#334155] p-6">
            <p className="text-slate-400 text-sm">No se encontraron productos químicos que coincidan con la búsqueda o el filtro.</p>
            <button 
              onClick={() => { setSearchTerm(""); setStatusFilter("Todos"); }}
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <>
            {/* ==========================================
                VISTA EN TARJETAS (Móviles: < md)
                ========================================== */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredProducts.map((product) => {
                const status = getProductStatus(product);
                return (
                  <div 
                    key={product.id} 
                    className="rounded-xl border border-[#334155] bg-[#1e293b] p-4 flex flex-col justify-between gap-4 hover:border-slate-400 transition-all shadow-md"
                  >
                    {/* Header de Tarjeta */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-mono">ID: {product.id}</span>
                          {/* Botones de Administración Móviles */}
                          {isAdminMode && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <button 
                                onClick={() => handleOpenEdit(product)}
                                className="p-1 rounded bg-[#253347] border border-[#334155] text-blue-400 hover:text-white"
                                title="Editar producto"
                              >
                                <EditIcon />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id, product.nombre)}
                                className="p-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white"
                                title="Eliminar producto"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">{product.nombre}</h3>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold tracking-wide shrink-0 ${getStatusBadgeStyles(status)}`}>
                        {status}
                      </span>
                    </div>

                    {/* Contenido Secundario */}
                    <div className="py-2 border-y border-[#334155]/40 flex flex-col gap-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Vencimiento SENASA:</span>
                        <span className="font-mono text-slate-200 font-semibold bg-slate-800/40 px-2 py-0.5 rounded border border-[#334155]/30">
                          {product.vencimientoSenasa || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Acciones de descarga */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Documentos Disponibles</p>
                      <div className="grid grid-cols-3 gap-2">
                        {/* SENASA */}
                        {product.linkSenasa ? (
                          <a
                            href={getAbsoluteLink(product.linkSenasa)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#253347] border border-[#334155] text-slate-200 hover:bg-[#2d3e56] hover:border-slate-400 active:scale-95 transition-all min-h-[52px]"
                            title="Certificado SENASA"
                          >
                            <DownloadIcon />
                            <span className="text-[9px] font-bold mt-1 uppercase">SENASA</span>
                          </a>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#131b2b] border border-[#1e293b]/50 text-slate-600 cursor-not-allowed min-h-[52px]"
                            title="No disponible"
                          >
                            <FileOffIcon />
                            <span className="text-[9px] font-medium mt-1">N/A</span>
                          </div>
                        )}

                        {/* Ficha Técnica */}
                        {product.linkFichaTecnica ? (
                          <a
                            href={getAbsoluteLink(product.linkFichaTecnica)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#253347] border border-[#334155] text-slate-200 hover:bg-[#2d3e56] hover:border-slate-400 active:scale-95 transition-all min-h-[52px]"
                            title="Ficha Técnica"
                          >
                            <DownloadIcon />
                            <span className="text-[9px] font-bold mt-1 uppercase">F. Téc</span>
                          </a>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#131b2b] border border-[#1e293b]/50 text-slate-600 cursor-not-allowed min-h-[52px]"
                            title="No disponible"
                          >
                            <FileOffIcon />
                            <span className="text-[9px] font-medium mt-1">N/A</span>
                          </div>
                        )}

                        {/* Hoja de Seguridad (HDS) */}
                        {product.linkHojaSeguridad ? (
                          <a
                            href={getAbsoluteLink(product.linkHojaSeguridad)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#253347] border border-[#334155] text-slate-200 hover:bg-[#2d3e56] hover:border-slate-400 active:scale-95 transition-all min-h-[52px]"
                            title="Hoja de Seguridad"
                          >
                            <DownloadIcon />
                            <span className="text-[9px] font-bold mt-1 uppercase">HDS</span>
                          </a>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#131b2b] border border-[#1e293b]/50 text-slate-600 cursor-not-allowed min-h-[52px]"
                            title="No disponible"
                          >
                            <FileOffIcon />
                            <span className="text-[9px] font-medium mt-1">N/A</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ==========================================
                VISTA EN TABLA (Escritorio: >= md)
                ========================================== */}
            <div className="hidden md:block rounded-xl border border-[#334155] overflow-hidden bg-[#1e293b] shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">Listado de Productos Químicos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#334155] bg-slate-900/40">
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Producto</th>
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 text-center">SENASA</th>
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Vencimiento</th>
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 text-center">Ficha Téc.</th>
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 text-center">HDS</th>
                      <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Estado</th>
                      {isAdminMode && (
                        <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 text-center">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => {
                      const status = getProductStatus(product);
                      return (
                        <tr 
                          key={product.id} 
                          className="border-b border-[#334155]/60 hover:bg-[#253347]/60 transition-colors group"
                        >
                          {/* Producto */}
                          <td className="py-4 px-6">
                            <span className="text-[10px] font-bold text-slate-500 block font-mono">ID: {product.id}</span>
                            <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{product.nombre}</p>
                          </td>

                          {/* Certificado SENASA */}
                          <td className="py-4 px-6 text-center">
                            {product.linkSenasa ? (
                              <a 
                                href={getAbsoluteLink(product.linkSenasa)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 hover:border-slate-500 border border-[#334155] transition-all"
                                title="Descargar Certificado SENASA"
                              >
                                <DownloadIcon />
                              </a>
                            ) : (
                              <span className="inline-flex items-center justify-center w-9 h-9 text-slate-600" title="No disponible">
                                —
                              </span>
                            )}
                          </td>

                          {/* Fecha Vencimiento */}
                          <td className="py-4 px-6">
                            <span className={`font-mono text-xs font-semibold px-2 py-1 rounded bg-slate-800/40 border border-[#334155]/40 ${
                              status === 'Vencido' ? 'text-rose-400' : status === 'Por Vencer' ? 'text-orange-400' : 'text-slate-300'
                            }`}>
                              {product.vencimientoSenasa || "—"}
                            </span>
                          </td>

                          {/* Ficha Técnica */}
                          <td className="py-4 px-6 text-center">
                            {product.linkFichaTecnica ? (
                              <a 
                                href={getAbsoluteLink(product.linkFichaTecnica)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 hover:border-slate-500 border border-[#334155] transition-all"
                                title="Descargar Ficha Técnica"
                              >
                                <DownloadIcon />
                              </a>
                            ) : (
                              <span className="inline-flex items-center justify-center w-9 h-9 text-slate-600" title="No disponible">
                                —
                              </span>
                            )}
                          </td>

                          {/* HDS */}
                          <td className="py-4 px-6 text-center">
                            {product.linkHojaSeguridad ? (
                              <a 
                                href={getAbsoluteLink(product.linkHojaSeguridad)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 hover:border-slate-500 border border-[#334155] transition-all"
                                title="Descargar Hoja de Seguridad"
                              >
                                <DownloadIcon />
                              </a>
                            ) : (
                              <span className="inline-flex items-center justify-center w-9 h-9 text-slate-600" title="No disponible">
                                —
                              </span>
                            )}
                          </td>

                          {/* Estado */}
                          <td className="py-4 px-6">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${getStatusBadgeStyles(status)}`}>
                              {status}
                            </span>
                          </td>

                          {/* Acciones Administrativas Desktop */}
                          {isAdminMode && (
                            <td className="py-4 px-6 text-center whitespace-nowrap">
                              <button 
                                onClick={() => handleOpenEdit(product)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#253347] border border-[#334155] text-xs font-bold text-blue-400 hover:text-white transition-all cursor-pointer mr-2"
                                title="Editar producto"
                              >
                                <EditIcon />
                                <span>Editar</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id, product.nombre)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer"
                                title="Eliminar producto"
                              >
                                <TrashIcon />
                                <span>Eliminar</span>
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </main>

      {/* ==========================================
          MODAL DE FORMULARIO (Crear / Editar Producto)
          ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-slate-900/40">
              <h3 className="text-base font-extrabold text-white">
                {modalMode === 'create' ? "Agregar Nuevo Producto Químico" : "Editar Producto Químico"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <XIcon />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID / Código */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">ID de Producto</label>
                  <input 
                    type="text" 
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    disabled={modalMode === 'edit'}
                    placeholder="Ej. 141846" 
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#334155] bg-[#0c1222] text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                  />
                </div>

                {/* Vencimiento SENASA */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Vencimiento SENASA</label>
                  <input 
                    type="date" 
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#334155] bg-[#0c1222] text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    value={formVencimiento}
                    onChange={(e) => setFormVencimiento(e.target.value)}
                  />
                </div>
              </div>

              {/* Nombre del Producto */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. Jabon Liquido en Espuma..." 
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#334155] bg-[#0c1222] text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                />
              </div>

              <div className="pt-2 border-t border-[#334155] space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enlaces a Documentos (Google Drive o Locales)</h4>

                {/* Enlace SENASA */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Certificado SENASA (URL)</label>
                  <input 
                    type="url" 
                    placeholder="https://drive.google.com/..." 
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#334155] bg-[#0c1222] text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    value={formLinkSenasa}
                    onChange={(e) => setFormLinkSenasa(e.target.value)}
                  />
                </div>

                {/* Enlace Ficha Técnica */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ficha Técnica (URL)</label>
                  <input 
                    type="url" 
                    placeholder="https://drive.google.com/..." 
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#334155] bg-[#0c1222] text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    value={formLinkFT}
                    onChange={(e) => setFormLinkFT(e.target.value)}
                  />
                </div>

                {/* Enlace Hoja de Seguridad */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Hoja de Seguridad (HDS URL)</label>
                  <input 
                    type="url" 
                    placeholder="https://drive.google.com/..." 
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#334155] bg-[#0c1222] text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    value={formLinkHDS}
                    onChange={(e) => setFormLinkHDS(e.target.value)}
                  />
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#334155]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-bold text-slate-300 hover:text-white bg-[#253347] border border-[#334155] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL DE AUTENTICACIÓN (Contraseña de Administrador)
          ========================================== */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col p-6 space-y-4">
            
            {/* Encabezado */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <KeyIcon />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Acceso Restringido</h3>
                <p className="text-[11px] text-slate-400">Se requiere contraseña de administrador</p>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Contraseña</label>
                <input 
                  type="password" 
                  autoFocus
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="••••" 
                  className="w-full px-3.5 py-2.5 text-sm text-center font-mono rounded-xl border border-[#334155] bg-[#0c1222] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 tracking-widest text-lg"
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                />
              </div>

              {/* Mensaje de Error */}
              {passwordError && (
                <div className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 px-3.5 py-2 rounded-xl text-center">
                  {passwordError}
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-[#253347] border border-[#334155] rounded-xl cursor-pointer flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer flex-1 transition-all"
                >
                  Verificar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
