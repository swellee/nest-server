import { Injectable, CanActivate, ExecutionContext, applyDecorators, UseGuards, SetMetadata, createParamDecorator } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Role } from "./const";


@Injectable()
class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        const user = req.user
        const roles = this.reflector.get('roles', context.getHandler());
        return roles.some(r => user.roles.includes(r))
    }
}

export const Auth = (...roles: Role[]) => {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard('jwt'), RoleGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' })
    )
}

export const CurUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
})