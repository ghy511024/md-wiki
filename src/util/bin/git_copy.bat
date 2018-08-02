
:文件夹拷贝


set sourcePath=%1%
set targetPath=%2%

if not exist %targetPath% (
	 echo "project not exit"
     md "%targetPath%"
)

: /y 跳过确认，直接覆盖

xcopy %sourcePath% %targetPath% /y /s /e