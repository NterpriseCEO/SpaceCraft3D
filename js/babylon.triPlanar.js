var __decorate=this&&this.__decorate||function(e,i,n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)return Reflect.decorate(e,i,n,t);switch(arguments.length){case 2:return e.reduceRight(function(e,i){return i&&i(e)||e},i);case 3:return e.reduceRight(function(e,t){return void(t&&t(i,n))},void 0);case 4:return e.reduceRight(function(e,t){return t&&t(i,n,e)||e},t)}},BABYLON;!function(e){var i=function(e){function i(){e.call(this),this.DIFFUSEX=!1,this.DIFFUSEY=!1,this.DIFFUSEZ=!1,this.BUMPX=!1,this.BUMPY=!1,this.BUMPZ=!1,this.CLIPPLANE=!1,this.ALPHATEST=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.rebuild()}return __extends(i,e),i}(e.MaterialDefines),n=function(n){function t(t,r){n.call(this,t,r),this.tileSize=1,this.diffuseColor=new e.Color3(1,1,1),this.specularColor=new e.Color3(.2,.2,.2),this.specularPower=64,this.disableLighting=!1,this.maxSimultaneousLights=4,this._worldViewProjectionMatrix=e.Matrix.Zero(),this._defines=new i,this._cachedDefines=new i,this._cachedDefines.BonesPerMesh=-1}return __extends(t,n),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype._checkCache=function(e,i,n){return i?this._defines.INSTANCES!==n?!1:i._materialDefines&&i._materialDefines.isEqual(this._defines)?!0:!1:!0},t.prototype.isReady=function(n,t){if(this.checkReadyOnlyOnce&&this._wasPreviouslyReady)return!0;var r=this.getScene();if(!this.checkReadyOnEveryCall&&this._renderId===r.getRenderId()&&this._checkCache(r,n,t))return!0;var a=r.getEngine(),o=!1;if(this._defines.reset(),r.texturesEnabled){if(e.StandardMaterial.DiffuseTextureEnabled)for(var s=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],l=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"],f=0;f<s.length;f++)if(s[f]){if(!s[f].isReady())return!1;this._defines[l[f]]=!0}if(e.StandardMaterial.BumpTextureEnabled)for(var s=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],l=["BUMPX","BUMPY","BUMPZ"],f=0;f<s.length;f++)if(s[f]){if(!s[f].isReady())return!1;this._defines[l[f]]=!0}}if(r.clipPlane&&(this._defines.CLIPPLANE=!0),a.getAlphaTesting()&&(this._defines.ALPHATEST=!0),(this.pointsCloud||r.forcePointsCloud)&&(this._defines.POINTSIZE=!0),r.fogEnabled&&n&&n.applyFog&&r.fogMode!==e.Scene.FOGMODE_NONE&&this.fogEnabled&&(this._defines.FOG=!0),r.lightsEnabled&&!this.disableLighting&&(o=e.MaterialHelper.PrepareDefinesForLights(r,n,this._defines,this.maxSimultaneousLights)),n&&(o&&n.isVerticesDataPresent(e.VertexBuffer.NormalKind)&&(this._defines.NORMAL=!0),n.useVertexColors&&n.isVerticesDataPresent(e.VertexBuffer.ColorKind)&&(this._defines.VERTEXCOLOR=!0,n.hasVertexAlpha&&(this._defines.VERTEXALPHA=!0)),n.useBones&&n.computeBonesUsingShaders&&(this._defines.NUM_BONE_INFLUENCERS=n.numBoneInfluencers,this._defines.BonesPerMesh=n.skeleton.bones.length+1),t&&(this._defines.INSTANCES=!0)),!this._defines.isEqual(this._cachedDefines)){this._defines.cloneTo(this._cachedDefines),r.resetCachedMaterial();var d=new e.EffectFallbacks;this._defines.FOG&&d.addFallback(1,"FOG"),e.MaterialHelper.HandleFallbacksForShadows(this._defines,d,this.maxSimultaneousLights),this._defines.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,n);var u=[e.VertexBuffer.PositionKind];this._defines.NORMAL&&u.push(e.VertexBuffer.NormalKind),this._defines.VERTEXCOLOR&&u.push(e.VertexBuffer.ColorKind),e.MaterialHelper.PrepareAttributesForBones(u,n,this._defines,d),e.MaterialHelper.PrepareAttributesForInstances(u,this._defines);var c="triplanar",h=this._defines.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","tileSize"],p=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ"];e.MaterialHelper.PrepareUniformsAndSamplersList(m,p,this._defines,this.maxSimultaneousLights),this._effect=r.getEngine().createEffect(c,u,m,p,h,d,this.onCompiled,this.onError,{maxSimultaneousLights:this.maxSimultaneousLights})}return this._effect.isReady()?(this._renderId=r.getRenderId(),this._wasPreviouslyReady=!0,n&&(n._materialDefines||(n._materialDefines=new i),this._defines.cloneTo(n._materialDefines)),!0):!1},t.prototype.bindOnlyWorldMatrix=function(e){this._effect.setMatrix("world",e)},t.prototype.bind=function(i,t){var r=this.getScene();this.bindOnlyWorldMatrix(i),this._effect.setMatrix("viewProjection",r.getTransformMatrix()),e.MaterialHelper.BindBonesParameters(t,this._effect),this._effect.setFloat("tileSize",this.tileSize),r.getCachedMaterial()!==this&&(this.diffuseTextureX&&this._effect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._effect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._effect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._effect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._effect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._effect.setTexture("normalSamplerZ",this.normalTextureZ),e.MaterialHelper.BindClipPlane(this._effect,r),this.pointsCloud&&this._effect.setFloat("pointSize",this.pointSize),this._effect.setVector3("vEyePosition",r._mirroredCameraPosition?r._mirroredCameraPosition:r.activeCamera.position)),this._effect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),this._defines.SPECULARTERM&&this._effect.setColor4("vSpecularColor",this.specularColor,this.specularPower),r.lightsEnabled&&!this.disableLighting&&e.MaterialHelper.BindLights(r,t,this._effect,this._defines,this.maxSimultaneousLights),r.fogEnabled&&t.applyFog&&r.fogMode!==e.Scene.FOGMODE_NONE&&this._effect.setMatrix("view",r.getViewMatrix()),e.MaterialHelper.BindFogParameters(r,t,this._effect),n.prototype.bind.call(this,i,t)},t.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},t.prototype.dispose=function(e){this.mixTexture&&this.mixTexture.dispose(),n.prototype.dispose.call(this,e)},t.prototype.clone=function(i){var n=this;return e.SerializationHelper.Clone(function(){return new t(i,n.getScene())},this)},t.prototype.serialize=function(){var i=e.SerializationHelper.Serialize(this);return i.customType="BABYLON.TriPlanarMaterial",i},t.Parse=function(i,n,r){return e.SerializationHelper.Parse(function(){return new t(i.name,n)},i,n,r)},__decorate([e.serializeAsTexture()],t.prototype,"mixTexture"),__decorate([e.serializeAsTexture()],t.prototype,"diffuseTextureX"),__decorate([e.serializeAsTexture()],t.prototype,"diffuseTextureY"),__decorate([e.serializeAsTexture()],t.prototype,"diffuseTextureZ"),__decorate([e.serializeAsTexture()],t.prototype,"normalTextureX"),__decorate([e.serializeAsTexture()],t.prototype,"normalTextureY"),__decorate([e.serializeAsTexture()],t.prototype,"normalTextureZ"),__decorate([e.serialize()],t.prototype,"tileSize"),__decorate([e.serializeAsColor3()],t.prototype,"diffuseColor"),__decorate([e.serializeAsColor3()],t.prototype,"specularColor"),__decorate([e.serialize()],t.prototype,"specularPower"),__decorate([e.serialize()],t.prototype,"disableLighting"),__decorate([e.serialize()],t.prototype,"maxSimultaneousLights"),t}(e.Material);e.TriPlanarMaterial=n}(BABYLON||(BABYLON={})),BABYLON.Effect.ShadersStore.triplanarVertexShader="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\n#endif\nuniform float tileSize;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<shadowsVertexDeclaration>\nvoid main(void)\n{\n#include<instancesVertex>\n#include<bonesVertex>\ngl_Position=viewProjection*finalWorld*vec4(position,1.0);\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef DIFFUSEX\nvTextureUVX=worldPos.zy/tileSize;\n#endif\n#ifdef DIFFUSEY\nvTextureUVY=worldPos.xz/tileSize;\n#endif\n#ifdef DIFFUSEZ\nvTextureUVZ=worldPos.xy/tileSize;\n#endif\n#ifdef NORMAL\n\nvec3 xtan=vec3(0,0,1);\nvec3 xbin=vec3(0,1,0);\nvec3 ytan=vec3(1,0,0);\nvec3 ybin=vec3(0,0,1);\nvec3 ztan=vec3(1,0,0);\nvec3 zbin=vec3(0,1,0);\nvec3 normalizedNormal=normalize(normal);\nnormalizedNormal*=normalizedNormal;\nvec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);\nvec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);\nworldTangent=(world*vec4(worldTangent,1.0)).xyz;\nworldBinormal=(world*vec4(worldBinormal,1.0)).xyz;\nvec3 worldNormal=normalize(cross(worldTangent,worldBinormal));\ntangentSpace[0]=worldTangent;\ntangentSpace[1]=worldBinormal;\ntangentSpace[2]=worldNormal;\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n",BABYLON.Effect.ShadersStore.triplanarPixelShader="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<lightFragmentDeclaration>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\nuniform sampler2D diffuseSamplerX;\n#ifdef BUMPX\nuniform sampler2D normalSamplerX;\n#endif\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\nuniform sampler2D diffuseSamplerY;\n#ifdef BUMPY\nuniform sampler2D normalSamplerY;\n#endif\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\nuniform sampler2D diffuseSamplerZ;\n#ifdef BUMPZ\nuniform sampler2D normalSamplerZ;\n#endif\n#endif\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(0.,0.,0.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=tangentSpace[2];\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\nvec4 baseNormal=vec4(0.0,0.0,0.0,1.0);\nnormalW*=normalW;\n#ifdef DIFFUSEX\nbaseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;\n#ifdef BUMPX\nbaseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;\n#endif\n#endif\n#ifdef DIFFUSEY\nbaseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;\n#ifdef BUMPY\nbaseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;\n#endif\n#endif\n#ifdef DIFFUSEZ\nbaseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;\n#ifdef BUMPZ\nbaseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;\n#endif\n#endif\n#ifdef NORMAL\nnormalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n}\n";