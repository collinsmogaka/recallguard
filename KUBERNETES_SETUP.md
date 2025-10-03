# Kubernetes Setup for RecallGuard

## Creating Secrets

To create the recallguard-secrets in Kubernetes, use the following PowerShell command:

```powershell
$secretKey = -join ((1..32 | ForEach-Object { '{0:X2}' -f (Get-Random -Maximum 256) }))
kubectl create secret generic recallguard-secrets `
  --from-literal=DATABASE_URL="postgresql://recallguard:recallpass@<db-host>:5432/recallguard" `
  --from-literal=SECRET_KEY=$secretKey `
  --from-literal=HUGGINGFACE_API_KEY="hf_xxx" `
  --from-literal=SENTRY_DSN="" `
  --from-literal=ENVIRONMENT="prod"
```

Replace `<db-host>` with the actual database host.

## Cluster Setup

If you encounter "the server could not find the requested resource (post secrets)", ensure a Kubernetes cluster is running:

- Enable Kubernetes in Docker Desktop (Settings > Kubernetes > Enable Kubernetes).
- Or install Minikube: Download from https://minikube.sigs.k8s.io/docs/start/ and run `minikube start`.
- Verify with `kubectl cluster-info`.
