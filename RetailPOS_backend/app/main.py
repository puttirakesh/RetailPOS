from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.routers import (
    brand, city, state, agent, purchaser, salesperson,
    mark, group, category, attribute, product, customer, supplier, slab
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS - Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
def root():
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Register all routers
app.include_router(state.router)
app.include_router(city.router)
app.include_router(brand.router)
app.include_router(agent.router)
app.include_router(purchaser.router)
app.include_router(salesperson.router)
app.include_router(mark.router)
app.include_router(group.router)
app.include_router(category.router)
app.include_router(attribute.router)
app.include_router(product.router)
app.include_router(customer.router)
app.include_router(supplier.router)
app.include_router(slab.router)


# Global exception handler for cleaner errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal error: {str(exc)}"}
    )