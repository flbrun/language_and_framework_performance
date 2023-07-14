@echo off
setlocal enabledelayedexpansion

REM Variables
set "method=method_tmpl"
set "server=server_tmpl"
set "port=port_tmpl"
set "endpoint=endpoint_tmpl"
set "num_requests=request_tmpl"

set "url=%method%%server%:%port%/%endpoint%"

set "total_time=0"
set "valid_requests=0"
set "min_time=9999999"
set "max_time=0"
set "failed_requests=0"

set "counter=0"
:loop
if %counter%==%num_requests% goto calculate_average

for /f "usebackq tokens=* delims=" %%a in (`curl.exe -s -o nul -w "%%{time_total}" "%url%"`) do (
  set "response=%%a"
  if not defined response (
    set /a "failed_requests+=1"
  ) else (
    set "request_time=!response!"
    set /a "total_time+=!request_time!"
    set /a "valid_requests+=1"
    if !request_time! lss !min_time! (
      set "min_time=!request_time!"
    )
    if !request_time! gtr !max_time! (
      set "max_time=!request_time!"
    )
  )
  echo !request_time!
)

set /a "counter+=1"
goto loop

:calculate_average
REM Calculate average time
if %valid_requests% gtr 0 (
  set /a "average_time=%total_time% / %valid_requests%"
  echo Average time spent: %average_time% seconds
  echo Minimal time: %min_time% seconds
  echo Maximal time: %max_time% seconds
  echo Failed requests: %failed_requests%
) else (
  echo No valid requests were recorded.
)

endlocal
