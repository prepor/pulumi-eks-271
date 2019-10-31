import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

// Create a VPC for our cluster.
const vpc = new awsx.ec2.Vpc("my-vpc");
const allVpcSubnets = vpc.privateSubnetIds.concat(vpc.publicSubnetIds);

// Create an EKS cluster inside of the VPC.
const cluster = new eks.Cluster("my-cluster", {
    vpcId: vpc.id,
    subnetIds: allVpcSubnets,
    nodeAssociatePublicIpAddress: false,
});

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;
