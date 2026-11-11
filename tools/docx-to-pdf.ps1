# Converts the generated résumé .docx to the PDF the site serves, using Microsoft Word.
# Usage: powershell -ExecutionPolicy Bypass -File tools/docx-to-pdf.ps1 [in.docx] [out.pdf]
param(
  [string]$In = (Join-Path $PSScriptRoot "out\Philipus-Cahyadi-Resume.docx"),
  [string]$Out = (Join-Path $PSScriptRoot "..\public\Philipus-Cahyadi-Resume.pdf")
)
$ErrorActionPreference = "Stop"
$In = (Resolve-Path $In).Path
$Out = [System.IO.Path]::GetFullPath($Out)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  $doc = $word.Documents.Open($In, $false, $true)
  $pages = $doc.ComputeStatistics(2)
  $doc.ExportAsFixedFormat($Out, 17)   # 17 = PDF
  $doc.Close($false)
  Write-Output "Wrote $Out ($pages pages)"
  if ($pages -gt 2) { Write-Warning "The CV is $pages pages; aim for 2." }
} finally {
  $word.Quit()
}
