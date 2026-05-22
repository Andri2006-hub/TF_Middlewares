Arquivos na pasta patch_for_user:
- _web.js -> substitua por _web.js na raiz do projeto
- app_Http_Middlewares_LogMiddleware.js -> copie para app/Http/Middlewares/LogMiddleware.js
- docs_Course.json -> copie para docs/Course.json
- routes_router.js -> copie para routes/router.js

Instruções para aplicar manualmente (PowerShell):

```powershell
$proj = "c:/Users/andri/OneDrive/Documentos/TF Middlewares/unifaat-2026-dw-project"
# Fazer backup rápido
Copy-Item "$proj\_web.js" "$proj\_web.js.bak" -ErrorAction SilentlyContinue
Copy-Item "$proj\app\Http\Middlewares\LogMiddleware.js" "$proj\app\Http\Middlewares\LogMiddleware.js.bak" -ErrorAction SilentlyContinue
Copy-Item "$proj\docs\Course.json" "$proj\docs\Course.json.bak" -ErrorAction SilentlyContinue
Copy-Item "$proj\routes\router.js" "$proj\routes\router.js.bak" -ErrorAction SilentlyContinue

# Copiar novos arquivos do patch_for_user para o local correto
Copy-Item "$proj\patch_for_user\_web.js" "$proj\_web.js" -Force
Copy-Item "$proj\patch_for_user\app_Http_Middlewares_LogMiddleware.js" "$proj\app\Http\Middlewares\LogMiddleware.js" -Force
Copy-Item "$proj\patch_for_user\docs_Course.json" "$proj\docs\Course.json" -Force
Copy-Item "$proj\patch_for_user\routes_router.js" "$proj\routes\router.js" -Force

# Commitar e enviar
cd $proj
git add -A
git commit -m "apply: patch for middleware, swagger and web entrypoint"
git push origin main
```

Se preferir, eu posso tentar aplicar e commitar aqui (posso repetir o push se necessário).