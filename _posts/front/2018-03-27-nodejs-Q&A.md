---
title: NODEJS填坑帖
tag:
- nodejs
- npm
- error
---

1. 安装weex环境遇到的一个错误  


```js  
node "C:\Users\Administrator\AppData\Roaming\npm\node_modules\cnpm\node_modules\npminstall\node-gyp-bin\\node-gyp.js" rebuild
在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关。
MSBUILD : error MSB1025:  运行 MSBuild 时发生内部错误。
Microsoft.Build.BuildEngine.InvalidToolsetDefinitionException: 没有为 ToolsVersion“14.0”(在“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSBuild\ToolsVersions\14.0”处定义)指定 MSBuildToolsPath，或者指定值的计算结果为空字符串。
   在 Microsoft.Build.BuildEngine.InvalidToolsetDefinitionException.Throw(Exception innerException, String resourceName, Object[] args)
   在 Microsoft.Build.BuildEngine.ToolsetReader.ReadToolset(PropertyDefinition toolsVersion, BuildPropertyGroup globalProperties, BuildPropertyGroup initialProperties, Boolean accumulateProperties)
   在 Microsoft.Build.BuildEngine.ToolsetReader.ReadEachToolset(ToolsetCollection toolsets, BuildPropertyGroup globalProperties, BuildPropertyGroup initialProperties, Boolean accumulateProperties)
   在 Microsoft.Build.BuildEngine.ToolsetReader.ReadToolsets(ToolsetCollection toolsets, BuildPropertyGroup globalProperties, BuildPropertyGroup initialProperties, Boolean accumulateProperties)
   在 Microsoft.Build.BuildEngine.ToolsetReader.ReadAllToolsets(ToolsetCollection toolsets, ToolsetRegistryReader registryReader, ToolsetConfigurationReader configurationReader, BuildPropertyGroup globalProperties, BuildPropertyGroup initialProperties, ToolsetDefinitionLocations locations)
   在 Microsoft.Build.BuildEngine.Engine.PopulateToolsetStateMap(ToolsetDefinitionLocations locations)
   在 Microsoft.Build.BuildEngine.Engine..ctor(Int32 numberOfCpus, Boolean isChildNode, Int32 parentNodeId, String localNodeProviderParameters, BuildPropertyGroup globalProperties, ToolsetDefinitionLocations locations)
   在 Microsoft.Build.BuildEngine.Engine.get_GlobalEngine()
   在 Microsoft.Build.BuildEngine.Project..ctor(Engine engine, String toolsVersion)
   在 Microsoft.Build.BuildEngine.SolutionWrapperProject.Generate(String solutionPath, String toolsVersionOverride, BuildEventContext projectBuildEventContext)
   在 Microsoft.Build.Execution.ProjectInstance.GenerateSolutionWrapperUsingOldOM(String projectFile, IDictionary`2 globalProperties, String toolsVersion, ProjectRootElementCache projectRootElementCache, BuildParameters buildParameters, ILoggingService loggingService, BuildEventContext projectBuildEventContext, Boolean isExplicitlyLoaded)
   在 Microsoft.Build.Execution.ProjectInstance.LoadSolutionForBuild(String projectFile, PropertyDictionary`1 globalPropertiesInstances, String toolsVersion, BuildParameters buildParameters, ILoggingService loggingService, BuildEventContext projectBuildEventContext, Boolean isExplicitlyLoaded)
   在 Microsoft.Build.Execution.BuildManager.LoadSolutionIntoConfiguration(BuildRequestConfiguration config, BuildEventContext buildEventContext)
   在 Microsoft.Build.Execution.BuildManager.HandleNewRequest(Int32 node, BuildRequestBlocker blocker)
   在 Microsoft.Build.Execution.BuildManager.IssueRequestToScheduler(BuildSubmission submission, Boolean allowMainThreadBuild, BuildRequestBlocker blocker)
   在 Microsoft.Build.Execution.BuildManager.<>c__DisplayClass14.<ExecuteSubmission>b__11()

MSBUILD : error MSB1025:  运行 MSBuild 时发生内部错误。
Microsoft.Build.BuildEngine.InvalidToolsetDefinitionException: 没有为 ToolsVersion“14.0”(在“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSBuild\ToolsVersions\14.0”处定义)指定 MSBuildToolsPath，或者指定值的计算结果为空字符串。
   在 Microsoft.Build.CommandLine.MSBuildApp.BuildProject(String projectFile, String[] targets, String toolsVersion, Dictionary`2 globalProperties, ILogger[] loggers, LoggerVerbosity verbosity, DistributedLoggerRecord[] distributedLoggerRecords, Boolean needToValidateProject, String schemaFile, Int32 cpuCount, Boolean enableNodeReuse, TextWriter preprocessWriter, Boolean debugger, Boolean detailedSummary)
   在 Microsoft.Build.CommandLine.MSBuildApp.Execute(String commandLine)
[2/4] scripts.install xtoolkit@0.2.23 ? dns@0.2.2 ? tomahawk@0.1.6 ? socket.io@1.0.6 ? engine.io@1.3.1 ? ws@0.4.31 finished in 9s

```
### 解决方法：  
注册表中删除`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSBuild\ToolsVersions\14.0`这个KEY值