# Conclusion del profiling /api/randoms

Luego de probar el servidor en la ruta api/randoms/10000000 con el metodo bloqueante y no bloqueante obtuve resultados diferenciados

## Bloqueante

http.response_time:
  min: ......................................................................... 170
  max: ......................................................................... 5877
  median: ...................................................................... 5065.6

## No Bloqueante (child_process)

http.response_time:
  min: ......................................................................... 443
  max: ......................................................................... 1516
  median: ...................................................................... 837.3

Podemos ver que el metodo no bloqueante es cerca de 6 veces mas rapido que el no bloquante

# Conclusion del profiling /info

## Sin console.log()
[Shared libraries]:
   ticks  total  nonlib   name
    485   79.6%          C:\Windows\SYSTEM32\ntdll.dll
    121   19.9%          C:\Program Files\nodejs\node.exe
      1    0.2%          C:\Windows\System32\KERNELBASE.dll


http.response_time:
  min: ......................................................................... 6
  max: ......................................................................... 87
  median: ...................................................................... 7.9
## Con console.log()
[Shared libraries]:
   ticks  total  nonlib   name
    629   82.7%          C:\Windows\SYSTEM32\ntdll.dll
    130   17.1%          C:\Program Files\nodejs\node.exe

http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 117
  median: ...................................................................... 6

El servidor sin console.logs necesita cerca de un 30% menos de ticks para el mismo numero de requests;